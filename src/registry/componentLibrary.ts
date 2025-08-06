// src/registry/componentLibrary.ts

import { ComponentCategory, ComponentDefinition, ComponentLibrary } from '@/lib/dev-container';
import { validateUniqueIds } from './helper';

// Import JSON data files
import shadcnComponentsData from './library-data/shadcnComponents.json';
import htmlComponentsData from './library-data/htmlComponents.json';

// Get dev-container repository configuration from environment variables
const DEV_CONTAINER_URL = (import.meta.env.VITE_REPOSITORY_URL || 'https://github.com/your-username/your-repo').replace(/\/$/, '');
const BASE_BRANCH = import.meta.env.VITE_BASE_BRANCH || 'main';
const DEV_CONTAINER_SHADCN_URL = `${DEV_CONTAINER_URL}/blob/${BASE_BRANCH}/src/lib/dev-container/shadcn`;
const DEV_CONTAINER_HTML_URL = `${DEV_CONTAINER_URL}/blob/${BASE_BRANCH}/src/lib/dev-container/html`;

// Helper function to normalize component definition paths
const normalizeComponentDefinitions = (
  definitionsData: any[], 
  baseUrl: string
): ComponentDefinition[] => {
  return definitionsData.map(definition => ({
    ...definition,
    // Update repository path to use environment variables
    repositoryPath: definition.repositoryPath && definition.repositoryPath.startsWith('http') 
      ? definition.repositoryPath 
      : `${baseUrl}/${definition.componentPath.split('/').pop()}`
  }));
};

// Load and normalize component definitions from JSON files
const shadcnComponents: ComponentDefinition[] = normalizeComponentDefinitions(
  shadcnComponentsData, 
  DEV_CONTAINER_SHADCN_URL
);

const htmlComponents: ComponentDefinition[] = normalizeComponentDefinitions(
  htmlComponentsData, 
  DEV_CONTAINER_HTML_URL
);

// Core system components (can be defined inline or moved to JSON later)
const coreComponents: ComponentDefinition[] = [
  {
    id: 'dev-container',
    name: 'Dev Container',
    description: 'Core development mode container wrapper for component registration',
    componentPath: 'src/lib/dev-container/components/Container.tsx',
    repositoryPath: `${DEV_CONTAINER_URL}/blob/${BASE_BRANCH}/src/lib/dev-container/components/Container.tsx`,
    category: 'layout',
    semanticTags: ['container', 'wrapper', 'dev', 'registration', 'core'],
  }
];

// Merge all component definitions  
const allComponentDefinitions = [
  ...coreComponents,
];

// Extract the literal union type for component IDs
export type ComponentLibraryId = typeof allComponentDefinitions[number]['id'];

// Create a typed version for runtime use
export const componentDefinitionsArray: ComponentDefinition[] = allComponentDefinitions;

// Build the component library
export const componentLibrary: ComponentLibrary = componentDefinitionsArray.reduce((library, definition) => {
  library[definition.id] = definition;
  return library;
}, {} as ComponentLibrary);

// Export the component definitions
export { componentDefinitionsArray as componentDefinitions };

// Development-time logging and validation
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Component Library Configuration:', {
    devContainerUrl: DEV_CONTAINER_URL,
    baseBranch: BASE_BRANCH,
    shadcnComponents: shadcnComponents.length,
    htmlComponents: htmlComponents.length,
    coreComponents: coreComponents.length,
    totalComponents: allComponentDefinitions.length
  });
  
  // Validate unique IDs
  const validation = validateUniqueIds(componentDefinitionsArray);
  if (!validation.isValid) {
    throw new Error(`🚨 Duplicate component IDs detected: ${validation.duplicates.join(', ')}`);
  }
}

// Helper functions
export const getComponentDefinition = (id: string): ComponentDefinition | undefined => {
  return componentLibrary[id];
};

export const getComponentsByCategory = (category: ComponentCategory): ComponentDefinition[] => {
  return componentDefinitionsArray.filter(def => def.category === category);
};

export const getShadcnComponents = (): ComponentDefinition[] => {
  return componentDefinitionsArray.filter(def => def.semanticTags.includes('shadcn'));
};

export const getHTMLComponents = (): ComponentDefinition[] => {
  return componentDefinitionsArray.filter(def =>
    def.componentPath.includes('/html/') && !def.semanticTags.includes('shadcn')
  );
};

export const getCoreComponents = (): ComponentDefinition[] => {
  return componentDefinitionsArray.filter(def => def.semanticTags.includes('core'));
};

export const searchComponents = (query: string): ComponentDefinition[] => {
  const lowercaseQuery = query.toLowerCase();
  return componentDefinitionsArray.filter(def =>
    def.name.toLowerCase().includes(lowercaseQuery) ||
    def.description.toLowerCase().includes(lowercaseQuery) ||
    def.semanticTags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

