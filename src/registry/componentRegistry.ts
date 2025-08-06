// src/registry/componentRegistry.ts

import { ComponentUsage, ComponentRegistry, ComponentCategory } from '../lib/dev-container/types';

// Import JSON data files - Page-specific registry files
import landingPageUsagesData from './registry-data/landingPageUsages.json';
import loginPageUsagesData from './registry-data/loginPageUsages.json';
import registerPageUsagesData from './registry-data/registerPageUsages.json';
import dashboardPageUsagesData from './registry-data/dashboardPageUsages.json';
import forgotPasswordPageUsagesData from './registry-data/forgotPasswordPageUsages.json';
import resetPasswordPageUsagesData from './registry-data/resetPasswordPageUsages.json';
import auditLogsPageUsagesData from './registry-data/auditLogsPageUsages.json';
import sessionsPageUsagesData from './registry-data/sessionsPageUsages.json';
import settingsPageUsagesData from './registry-data/settingsPageUsages.json';
import adminDashboardPageUsagesData from './registry-data/adminDashboardPageUsages.json';
import adminAuditLogsPageUsagesData from './registry-data/adminAuditLogsPageUsages.json';
import usersPageUsagesData from './registry-data/usersPageUsages.json';
import userDetailsPageUsagesData from './registry-data/userDetailsPageUsages.json';
import appUsagesData from './registry-data/appUsages.json';
import logoUsagesData from './registry-data/logoUsages.json';
import { isValidComponentId } from './generatedTypes';

// ✅ Import the generated types
export type { ComponentRegistryId } from './generatedTypes';
export { isValidComponentId, validateComponentId, VALID_COMPONENT_IDS } from './generatedTypes';

// Get repository configuration from environment variables
const REPOSITORY_URL = (import.meta.env.VITE_REPOSITORY_URL || 'https://github.com/your-username/your-repo').replace(/\/$/, '');
const BASE_BRANCH = import.meta.env.VITE_BASE_BRANCH || 'main';

// Helper function to normalize repository paths in usage data
const normalizeUsageData = (usageData: any[]): ComponentUsage[] => {
  return usageData.map(usage => ({
    ...usage,
    // Update repository path to use environment variables if it's a relative path or needs updating
    repositoryPath: usage.repositoryPath && usage.repositoryPath.startsWith('http') 
      ? usage.repositoryPath 
      : `${REPOSITORY_URL}/blob/${BASE_BRANCH}/${usage.filePath}`
  }));
};

// Cast JSON data to ComponentUsage arrays with proper typing and normalized paths
const landingPageUsages: ComponentUsage[] = normalizeUsageData(landingPageUsagesData);
const loginPageUsages: ComponentUsage[] = normalizeUsageData(loginPageUsagesData);
const registerPageUsages: ComponentUsage[] = normalizeUsageData(registerPageUsagesData);
const dashboardPageUsages: ComponentUsage[] = normalizeUsageData(dashboardPageUsagesData);
const forgotPasswordPageUsages: ComponentUsage[] = normalizeUsageData(forgotPasswordPageUsagesData);
const resetPasswordPageUsages: ComponentUsage[] = normalizeUsageData(resetPasswordPageUsagesData);
const auditLogsPageUsages: ComponentUsage[] = normalizeUsageData(auditLogsPageUsagesData);
const sessionsPageUsages: ComponentUsage[] = normalizeUsageData(sessionsPageUsagesData);
const settingsPageUsages: ComponentUsage[] = normalizeUsageData(settingsPageUsagesData);
const adminDashboardPageUsages: ComponentUsage[] = normalizeUsageData(adminDashboardPageUsagesData);
const adminAuditLogsPageUsages: ComponentUsage[] = normalizeUsageData(adminAuditLogsPageUsagesData);
const usersPageUsages: ComponentUsage[] = normalizeUsageData(usersPageUsagesData);
const userDetailsPageUsages: ComponentUsage[] = normalizeUsageData(userDetailsPageUsagesData);
const appUsages: ComponentUsage[] = normalizeUsageData(appUsagesData);
const logoUsages: ComponentUsage[] = normalizeUsageData(logoUsagesData);

// Merge all component definitions
const allComponentUsages = [
  ...appUsages,
  ...logoUsages,
  ...landingPageUsages,
  ...loginPageUsages,
  ...registerPageUsages,
  ...dashboardPageUsages,
  ...forgotPasswordPageUsages,
  ...resetPasswordPageUsages,
  ...auditLogsPageUsages,
  ...sessionsPageUsages,
  ...settingsPageUsages,
  ...adminDashboardPageUsages,
  ...adminAuditLogsPageUsages,
  ...usersPageUsages,
  ...userDetailsPageUsages
];

// Development-time validation
if (process.env.NODE_ENV === 'development') {
  // Validate that all IDs in JSON match our generated types
  allComponentUsages.forEach(usage => {
    if (!isValidComponentId(usage.id)) {
      console.error(`❌ Invalid component ID in JSON: "${usage.id}"`);
      console.error('This component exists in JSON but not in generated types.');
      console.error('Run "npm run generate-types" to regenerate type definitions.');
    }
  });

  // Log repository configuration for debugging
  console.log('🔧 Component Registry Configuration:', {
    repositoryUrl: REPOSITORY_URL,
    baseBranch: BASE_BRANCH,
    totalUsages: allComponentUsages.length
  });
}

// Create a typed version for runtime use
export const componentUsageArray: ComponentUsage[] = allComponentUsages;

// Build the component registry
export const componentRegistry: ComponentRegistry = componentUsageArray.reduce((registry, definition) => {
  registry[definition.id] = definition;
  return registry;
}, {} as ComponentRegistry);

// Export for convenience
export { 
  landingPageUsages, 
  loginPageUsages, 
  registerPageUsages, 
  dashboardPageUsages,
  forgotPasswordPageUsages,
  resetPasswordPageUsages,
  auditLogsPageUsages,
  sessionsPageUsages,
  settingsPageUsages,
  adminDashboardPageUsages,
  adminAuditLogsPageUsages,
  usersPageUsages,
  userDetailsPageUsages,
  appUsages,
  logoUsages,
};

// Helper functions remain the same
export const getComponentUsage = (id: string): ComponentUsage | undefined => {
  return componentRegistry[id];
};

export const getUsagesByDefinition = (definitionId: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.definitionId === definitionId);
};

export const getUsagesByFile = (filePath: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.filePath === filePath);
};

export const getUsagesByCategory = (category: ComponentCategory): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.category === category);
};

export const getUsagesBySemanticTag = (tag: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.semanticTags.includes(tag));
};

export const searchUsages = (searchTerm: string): ComponentUsage[] => {
  const term = searchTerm.toLowerCase();
  return componentUsageArray.filter(usage => 
    usage.name.toLowerCase().includes(term) ||
    usage.description.toLowerCase().includes(term) ||
    usage.semanticTags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Statistics helpers
export const getUsageStats = () => {
  const stats = {
    total: componentUsageArray.length,
    byCategory: {} as Record<ComponentCategory, number>,
    byDefinition: {} as Record<string, number>,
    byFile: {} as Record<string, number>,
  };

  componentUsageArray.forEach(usage => {
    // Count by category
    stats.byCategory[usage.category] = (stats.byCategory[usage.category] || 0) + 1;
    
    // Count by definition
    stats.byDefinition[usage.definitionId] = (stats.byDefinition[usage.definitionId] || 0) + 1;
    
    // Count by file
    stats.byFile[usage.filePath] = (stats.byFile[usage.filePath] || 0) + 1;
  });

  return stats;
};

