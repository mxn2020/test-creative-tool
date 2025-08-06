// src/lib/dev-container/components/DevModeProvider.tsx

import React, { createContext, useContext, useEffect, ReactNode, useState, useRef } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  DevModeState, 
  DevModeActions, 
  DevModeConfig, 
  ChangeRequest, 
  ChangeCategory, 
  ChangePriority, 
  ChangeStatus,
  ComponentSystem, // Changed from ComponentRegistry
  SubmissionPayload,
  GlobalContext,
  PopoverPosition
} from '../types';
import { generateId } from '../utils/storage';
import { DevModeSettings } from './DevModeSettings';

// Default configuration
const defaultConfig: DevModeConfig = {
  enabled: false,
  showBorders: true,
  showTooltips: true,
  autoOpenSidebar: false,
  persistChanges: true,
  maxChanges: 50,
  submitEndpoint: `${import.meta.env.VITE_GEENIUS_API_URL || 'http://localhost:8888'}/api/process-changes`,
  authToken: undefined,
  // Visual customization
  showDashedBorders: true,
  hoverColor: '#3b82f6', // blue-500
  selectedColor: '#3b82f6', // blue-500
  showComponentIds: true,
  // Detailed containerization control
  detailedContainerization: false,
};

// Zustand store for dev mode state
interface DevModeStore extends DevModeState, DevModeActions {
  config: DevModeConfig;
  system: ComponentSystem; // Changed from registry
  setConfig: (config: Partial<DevModeConfig>) => void;
  setSystem: (system: ComponentSystem) => void; // Changed from setRegistry
}

const useDevModeStore = create<DevModeStore>()(
  persist(
    (set, get) => ({
      // State
      isEnabled: false,
      selectedComponentId: null,
      hoveredComponentId: null,
      changes: [],
      isSubmitting: false,
      sidebarOpen: false,
      showComponentTree: false,
      popoverState: null,
      config: defaultConfig,
      system: { library: {}, registry: {} }, // Changed from registry: {}

      // Actions
      toggleDevMode: () => set((state) => ({ 
        isEnabled: !state.isEnabled,
        selectedComponentId: null,
        hoveredComponentId: null,
        sidebarOpen: state.config.autoOpenSidebar ? !state.isEnabled : state.sidebarOpen
      })),

      selectComponent: (componentId: string) => set({ 
        selectedComponentId: componentId,
        hoveredComponentId: null 
      }),

      deselectComponent: () => set({ 
        selectedComponentId: null,
        hoveredComponentId: null 
      }),

      hoverComponent: (componentId: string | null) => set({ 
        hoveredComponentId: componentId 
      }),

      addChange: (change: Omit<ChangeRequest, 'id' | 'timestamp'>) => {
        const { changes, config, system } = get();
        
        if (changes.length >= config.maxChanges) {
          console.warn(`Maximum changes limit (${config.maxChanges}) reached`);
          return;
        }

        // Enrich change with component system data
        const usage = system.registry[change.componentId];
        const definition = usage ? system.library[usage.definitionId] : undefined;

        const enrichedChange: ChangeRequest = {
          ...change,
          id: generateId(),
          timestamp: Date.now(),
          status: ChangeStatus.PENDING,
          componentContext: {
            ...change.componentContext,
            // Add component system data if available
            ...(usage && {
              name: usage.name,
              description: usage.description,
              usageFilePath: usage.filePath,
              usageRepositoryPath: usage.repositoryPath,
              semanticTags: [...(change.componentContext.semanticTags || []), ...usage.semanticTags],
            }),
            ...(definition && {
              filePath: definition.componentPath,
              repositoryPath: definition.repositoryPath,
            }),
          },
        };

        set({ changes: [...changes, enrichedChange] });
      },

      updateChange: (id: string, updates: Partial<ChangeRequest>) => {
        const { changes } = get();
        const updatedChanges = changes.map(change =>
          change.id === id ? { ...change, ...updates } : change
        );
        set({ changes: updatedChanges });
      },

      removeChange: (id: string) => {
        const { changes } = get();
        const filteredChanges = changes.filter(change => change.id !== id);
        set({ changes: filteredChanges });
      },

      clearAllChanges: () => set({ changes: [] }),

      submitChanges: async () => {
        const { changes, config } = get();
        
        if (changes.length === 0) {
          console.warn('No changes to submit');
          return;
        }

        set({ isSubmitting: true });

        try {
          const payload: SubmissionPayload = {
            submissionId: generateId(),
            timestamp: Date.now(),
            changes,
            globalContext: {
              environment: 'development' as const,
              projectId: window.location.hostname,
              version: import.meta.env.VITE_APP_VERSION || '1.0.0',
              repositoryUrl: 'https://github.com/user/repo', // This should be dynamic
              userInfo: {
                sessionId: generateId(),
                userAgent: navigator.userAgent,
                viewport: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                },
              },
            } as GlobalContext,
            summary: {
              totalChanges: changes.length,
              categoryCounts: changes.reduce((acc, change) => {
                acc[change.category] = (acc[change.category] || 0) + 1;
                return acc;
              }, {} as Record<ChangeCategory, number>),
              priorityCounts: changes.reduce((acc, change) => {
                acc[change.priority] = (acc[change.priority] || 0) + 1;
                return acc;
              }, {} as Record<ChangePriority, number>),
              affectedComponents: [...new Set(changes.map(c => c.componentId))],
              estimatedComplexity: changes.length > 10 ? 'high' : changes.length > 5 ? 'medium' : 'low',
            },
          };

          const response = await fetch(config.submitEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(config.authToken && { 'Authorization': `Bearer ${config.authToken}` }),
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log('Changes submitted successfully:', result);

          // Mark changes as submitted
          const submittedChanges = changes.map(change => ({
            ...change,
            status: ChangeStatus.SUBMITTED,
          }));

          set({ changes: submittedChanges });

          // Auto-clear submitted changes after a delay
          setTimeout(() => {
            set({ changes: [] });
          }, 3000);

        } catch (error) {
          console.error('Failed to submit changes:', error);
          // Handle error (could add error state to store)
        } finally {
          set({ isSubmitting: false });
        }
      },

      toggleSidebar: () => set((state) => ({ 
        sidebarOpen: !state.sidebarOpen 
      })),

      toggleComponentTree: () => set((state) => ({ 
        showComponentTree: !state.showComponentTree 
      })),

      showPopover: (componentId: string, position: PopoverPosition, editingChangeId?: string) => set({
        popoverState: {
          componentId,
          isVisible: true,
          position,
          editingChangeId,
        },
        selectedComponentId: componentId,
      }),

      hidePopover: () => set({
        popoverState: null,
        selectedComponentId: null,
      }),

      setConfig: (newConfig: Partial<DevModeConfig>) => set((state) => ({
        config: { ...state.config, ...newConfig }
      })),

      setSystem: (system: ComponentSystem) => set({ system }), // Changed from setRegistry
    }),
    {
      name: 'dev-mode-storage',
      partialize: (state) => ({
        isEnabled: state.isEnabled,
        changes: state.config.persistChanges ? state.changes : [],
        config: state.config,
        sidebarOpen: state.sidebarOpen,
        showComponentTree: state.showComponentTree,
      }),
    }
  )
);

// Context for accessing dev mode store
const DevModeContext = createContext<DevModeStore | null>(null);

// Provider component
interface DevModeProviderProps {
  children: ReactNode;
  config?: Partial<DevModeConfig>;
  system: ComponentSystem; // Changed from registry
}

export const DevModeProvider: React.FC<DevModeProviderProps> = ({ 
  children, 
  config = {}, 
  system // Changed from registry
}) => {
  const store = useDevModeStore();

  // Set system synchronously before render
  React.useMemo(() => {
    store.setSystem(system); // Changed from setRegistry
  }, [system, store.setSystem]);

  useEffect(() => {
    // Update config when prop changes
    if (Object.keys(config).length > 0) {
      store.setConfig(config);
    }
  }, [config, store.setConfig]);

  return (
    <DevModeContext.Provider value={store}>
      {children}
    </DevModeContext.Provider>
  );
};

// Hook to access dev mode store
export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};

// Rest of the components remain exactly the same...
export const DevModeToggle: React.FC = () => {
  const { isEnabled, toggleDevMode } = useDevMode();

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleDevMode}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${isEnabled 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
        title="Toggle Dev Mode (Ctrl+Shift+D)"
      >
        {isEnabled ? 'Exit Dev Mode' : 'Enter Dev Mode'}
      </button>
    </div>
  );
};

export const DevModeFloatingIcon: React.FC = () => {
  const { isEnabled, changes, toggleSidebar, toggleDevMode } = useDevMode();
  const [showSettings, setShowSettings] = useState(false);
  const settingsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  // Settings-specific hover handlers
  const handleSettingsMouseEnter = () => {
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
    }
    setShowSettings(true);
  };

  const handleSettingsMouseLeave = () => {
    settingsTimeoutRef.current = setTimeout(() => {
      setShowSettings(false);
    }, 200); // 200ms debounce
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex flex-col items-center gap-2">
        {/* Settings button positioned above main icon - only show in dev mode */}
        {isEnabled && (
          <div 
            className={`
              relative w-12 h-12 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110 bg-gray-600 text-white hover:bg-gray-500
              ${showSettings ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
            `}
            onMouseEnter={handleSettingsMouseEnter}
            onMouseLeave={handleSettingsMouseLeave}
          >
            <DevModeSettings />
          </div>
        )}

        {/* Main dev mode icon */}
        <div 
          className={`
            relative w-12 h-12 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110
            ${isEnabled 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
          onClick={toggleDevMode}
          onMouseEnter={handleSettingsMouseEnter}
          title={`${isEnabled ? 'Exit' : 'Enter'} Dev Mode (Ctrl+Shift+D)`}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
              />
            </svg>
          </div>
          
          {/* Active indicator */}
          {isEnabled && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
          
          {/* Changes badge */}
          {changes.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {changes.length > 9 ? '9+' : changes.length}
            </div>
          )}
        </div>

        {/* Changes indicator when dev mode is active */}
        {isEnabled && changes.length > 0 && (
          <button
            onClick={toggleSidebar}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors shadow-md"
          >
            {changes.length} change{changes.length !== 1 ? 's' : ''}
          </button>
        )}

        {/* Keyboard shortcut hint */}
        <div className="text-xs text-gray-500 bg-black bg-opacity-10 px-2 py-1 rounded backdrop-blur-sm">
          Ctrl+Shift+D
        </div>
      </div>
    </div>
  );
};

export const DevModeIndicator: React.FC = () => {
  const { isEnabled, changes, toggleSidebar } = useDevMode();

  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Dev Mode</span>
          {changes.length > 0 && (
            <button
              onClick={toggleSidebar}
              className="ml-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded text-xs"
            >
              {changes.length} change{changes.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};