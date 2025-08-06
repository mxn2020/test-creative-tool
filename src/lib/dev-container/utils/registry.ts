// src/lib/dev-container/utils/registry.ts

import { ComponentUsage, ComponentRegistry, ComponentDefinition, ComponentLibrary, ComponentSystem, ValidationError, RegistryBuilderConfig, RegistryBuilder } from '../types';

export const createRegistryBuilder = (config: Partial<RegistryBuilderConfig> = {}): RegistryBuilder => {
  const fullConfig: RegistryBuilderConfig = {
    strict: true,
    autoGenerate: false,
    semanticAnalysis: false,
    includeSourceMap: false,
    ...config,
  };

  const usages: ComponentUsage[] = [];
  const errors: ValidationError[] = [];

  const addUsage = (usage: ComponentUsage): RegistryBuilder => {
    // Validate component usage
    const usageErrors = validateComponentUsage(usage);
    if (usageErrors.length > 0) {
      errors.push(...usageErrors);
      if (fullConfig.strict) {
        throw new Error(`Invalid component usage: ${usageErrors.map(e => e.message).join(', ')}`);
      }
    }

    // Check for duplicate IDs
    const existingIndex = usages.findIndex(u => u.id === usage.id);
    if (existingIndex !== -1) {
      if (fullConfig.strict) {
        throw new Error(`Duplicate component usage ID: ${usage.id}`);
      } else {
        // Replace existing usage
        usages[existingIndex] = usage;
        return builder;
      }
    }

    // Auto-generate ID if missing and autoGenerate is enabled
    if (!usage.id && fullConfig.autoGenerate) {
      usage.id = generateUsageId(usage.name);
    }

    // Auto-generate semantic tags if enabled
    if (fullConfig.semanticAnalysis) {
      usage.semanticTags = generateSemanticTags(usage);
    }

    usages.push(usage);
    return builder;
  };

  const addUsages = (usageList: ComponentUsage[]): RegistryBuilder => {
    usageList.forEach(usage => addUsage(usage));
    return builder;
  };

  const validate = (): ValidationError[] => {
    return [...errors];
  };

  const build = (): ComponentRegistry => {
    if (errors.length > 0 && fullConfig.strict) {
      throw new Error(`Registry validation failed: ${errors.map(e => e.message).join(', ')}`);
    }

    const registry: ComponentRegistry = {};
    usages.forEach(usage => {
      registry[usage.id] = usage;
    });

    return registry;
  };

  const builder: RegistryBuilder = {
    addUsage,
    addUsages,
    validate,
    build,
  };

  return builder;
};

// =====================================
// COMPONENT LIBRARY BUILDER (for ComponentDefinition)
// =====================================
export interface LibraryBuilder {
  addDefinition: (definition: ComponentDefinition) => LibraryBuilder;
  addDefinitions: (definitions: ComponentDefinition[]) => LibraryBuilder;
  validate: () => ValidationError[];
  build: () => ComponentLibrary;
}

export const createLibraryBuilder = (config: Partial<RegistryBuilderConfig> = {}): LibraryBuilder => {
  const fullConfig: RegistryBuilderConfig = {
    strict: true,
    autoGenerate: false,
    semanticAnalysis: false,
    includeSourceMap: false,
    ...config,
  };

  const definitions: ComponentDefinition[] = [];
  const errors: ValidationError[] = [];

  const addDefinition = (definition: ComponentDefinition): LibraryBuilder => {
    // Validate component definition
    const definitionErrors = validateComponentDefinition(definition);
    if (definitionErrors.length > 0) {
      errors.push(...definitionErrors);
      if (fullConfig.strict) {
        throw new Error(`Invalid component definition: ${definitionErrors.map(e => e.message).join(', ')}`);
      }
    }

    // Check for duplicate IDs
    const existingIndex = definitions.findIndex(d => d.id === definition.id);
    if (existingIndex !== -1) {
      if (fullConfig.strict) {
        throw new Error(`Duplicate component definition ID: ${definition.id}`);
      } else {
        // Replace existing definition
        definitions[existingIndex] = definition;
        return builder;
      }
    }

    // Auto-generate ID if missing and autoGenerate is enabled
    if (!definition.id && fullConfig.autoGenerate) {
      definition.id = generateDefinitionId(definition.name);
    }

    // Auto-generate semantic tags if enabled
    if (fullConfig.semanticAnalysis) {
      definition.semanticTags = generateSemanticTags(definition);
    }

    definitions.push(definition);
    return builder;
  };

  const addDefinitions = (definitionList: ComponentDefinition[]): LibraryBuilder => {
    definitionList.forEach(definition => addDefinition(definition));
    return builder;
  };

  const validate = (): ValidationError[] => {
    return [...errors];
  };

  const build = (): ComponentLibrary => {
    if (errors.length > 0 && fullConfig.strict) {
      throw new Error(`Library validation failed: ${errors.map(e => e.message).join(', ')}`);
    }

    const library: ComponentLibrary = {};
    definitions.forEach(definition => {
      library[definition.id] = definition;
    });

    return library;
  };

  const builder: LibraryBuilder = {
    addDefinition,
    addDefinitions,
    validate,
    build,
  };

  return builder;
};

// =====================================
// VALIDATION FUNCTIONS (Updated)
// =====================================
const validateComponentUsage = (usage: ComponentUsage): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!usage.id) {
    errors.push({ field: 'id', message: 'Component usage ID is required', value: usage.id });
  }

  if (!usage.definitionId) {
    errors.push({ field: 'definitionId', message: 'Component definition ID is required', value: usage.definitionId });
  }

  if (!usage.name) {
    errors.push({ field: 'name', message: 'Component usage name is required', value: usage.name });
  }

  if (!usage.description) {
    errors.push({ field: 'description', message: 'Component usage description is required', value: usage.description });
  }

  if (!usage.filePath) {
    errors.push({ field: 'filePath', message: 'Component usage file path is required', value: usage.filePath });
  }

  if (!usage.category) {
    errors.push({ field: 'category', message: 'Component usage category is required', value: usage.category });
  }

  if (!Array.isArray(usage.semanticTags)) {
    errors.push({ field: 'semanticTags', message: 'Semantic tags must be an array', value: usage.semanticTags });
  }

  // Validate file path format
  if (usage.filePath && !usage.filePath.match(/\.(tsx?|jsx?)$/)) {
    errors.push({ field: 'filePath', message: 'File path must end with .tsx, .ts, .jsx, or .js', value: usage.filePath });
  }

  return errors;
};

const validateComponentDefinition = (definition: ComponentDefinition): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!definition.id) {
    errors.push({ field: 'id', message: 'Component definition ID is required', value: definition.id });
  }

  if (!definition.name) {
    errors.push({ field: 'name', message: 'Component definition name is required', value: definition.name });
  }

  if (!definition.description) {
    errors.push({ field: 'description', message: 'Component definition description is required', value: definition.description });
  }

  if (!definition.componentPath) {
    errors.push({ field: 'componentPath', message: 'Component definition path is required', value: definition.componentPath });
  }

  if (!definition.category) {
    errors.push({ field: 'category', message: 'Component definition category is required', value: definition.category });
  }

  if (!Array.isArray(definition.semanticTags)) {
    errors.push({ field: 'semanticTags', message: 'Semantic tags must be an array', value: definition.semanticTags });
  }

  // Validate component path format
  if (definition.componentPath && !definition.componentPath.match(/\.(tsx?|jsx?)$/)) {
    errors.push({ field: 'componentPath', message: 'Component path must end with .tsx, .ts, .jsx, or .js', value: definition.componentPath });
  }

  return errors;
};

// =====================================
// UTILITY FUNCTIONS (Updated naming)
// =====================================
const generateUsageId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateDefinitionId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateSemanticTags = (item: ComponentUsage | ComponentDefinition): string[] => {
  const tags: string[] = [];

  // Add category as a tag
  tags.push(item.category);

  // Extract tags from name
  const nameWords = item.name.toLowerCase().split(/\s+/);
  tags.push(...nameWords.filter(word => word.length > 2));

  // Extract tags from description
  const descriptionWords = item.description.toLowerCase().split(/\s+/);
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'];
  const meaningfulWords = descriptionWords.filter(word => 
    word.length > 3 && !commonWords.includes(word) && !word.match(/^\d+$/)
  );
  tags.push(...meaningfulWords.slice(0, 3));

  // Add file path based tags
  let path: string | undefined;
  if ('filePath' in item && typeof item.filePath === 'string') {
    path = item.filePath;
  } else if ('componentPath' in item && typeof item.componentPath === 'string') {
    path = item.componentPath;
  }
  if (path) {
    const pathParts = path.split('/');
    pathParts.forEach(part => {
      if (part.includes('.')) {
        const fileName = part.split('.')[0];
        if (fileName.length > 2) {
          tags.push(fileName.toLowerCase());
        }
      }
    });
  }

  // Remove duplicates and return
  return [...new Set(tags)];
};

// =====================================
// REGISTRY OPERATIONS (Component Usages)
// =====================================
export const createRegistry = (usages: ComponentUsage[], config?: Partial<RegistryBuilderConfig>): ComponentRegistry => {
  return createRegistryBuilder(config)
    .addUsages(usages)
    .build();
};

export const mergeRegistries = (...registries: ComponentRegistry[]): ComponentRegistry => {
  const merged: ComponentRegistry = {};
  
  registries.forEach(registry => {
    Object.assign(merged, registry);
  });
  
  return merged;
};

export const filterRegistry = (
  registry: ComponentRegistry,
  predicate: (usage: ComponentUsage) => boolean
): ComponentRegistry => {
  const filtered: ComponentRegistry = {};
  
  Object.entries(registry).forEach(([id, usage]) => {
    if (predicate(usage)) {
      filtered[id] = usage;
    }
  });
  
  return filtered;
};

export const searchRegistry = (
  registry: ComponentRegistry,
  query: string
): ComponentUsage[] => {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(registry).filter(usage => {
    return (
      usage.name.toLowerCase().includes(lowerQuery) ||
      usage.description.toLowerCase().includes(lowerQuery) ||
      usage.filePath.toLowerCase().includes(lowerQuery) ||
      usage.semanticTags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
};

// =====================================
// LIBRARY OPERATIONS (Component Definitions)
// =====================================
export const createLibrary = (definitions: ComponentDefinition[], config?: Partial<RegistryBuilderConfig>): ComponentLibrary => {
  return createLibraryBuilder(config)
    .addDefinitions(definitions)
    .build();
};

export const mergeLibraries = (...libraries: ComponentLibrary[]): ComponentLibrary => {
  const merged: ComponentLibrary = {};
  
  libraries.forEach(library => {
    Object.assign(merged, library);
  });
  
  return merged;
};

export const filterLibrary = (
  library: ComponentLibrary,
  predicate: (definition: ComponentDefinition) => boolean
): ComponentLibrary => {
  const filtered: ComponentLibrary = {};
  
  Object.entries(library).forEach(([id, definition]) => {
    if (predicate(definition)) {
      filtered[id] = definition;
    }
  });
  
  return filtered;
};

export const searchLibrary = (
  library: ComponentLibrary,
  query: string
): ComponentDefinition[] => {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(library).filter(definition => {
    return (
      definition.name.toLowerCase().includes(lowerQuery) ||
      definition.description.toLowerCase().includes(lowerQuery) ||
      definition.componentPath.toLowerCase().includes(lowerQuery) ||
      definition.semanticTags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
};

// =====================================
// COMPONENT SYSTEM OPERATIONS
// =====================================

// Create a complete component system
export const createComponentSystem = (
  library: ComponentLibrary,
  registry: ComponentRegistry
): ComponentSystem => {
  return { library, registry };
};

// Get full component information (usage + definition)
export const getFullComponentInfo = (
  usageId: string,
  system: ComponentSystem
): {
  usage: ComponentUsage;
  definition: ComponentDefinition;
} | null => {
  const usage = system.registry[usageId];
  if (!usage) return null;
  
  const definition = system.library[usage.definitionId];
  if (!definition) return null;
  
  return { usage, definition };
};

// Search across both library and registry
export const searchComponentSystem = (
  system: ComponentSystem,
  query: string
): {
  definitions: ComponentDefinition[];
  usages: ComponentUsage[];
} => {
  const definitions = searchLibrary(system.library, query);
  const usages = searchRegistry(system.registry, query);
  
  return { definitions, usages };
};

// Validate component system integrity
export const validateComponentSystem = (system: ComponentSystem): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Check that all usage definitionIds exist in library
  Object.values(system.registry).forEach(usage => {
    if (!system.library[usage.definitionId]) {
      errors.push({
        field: 'definitionId',
        message: `Usage "${usage.id}" references non-existent definition "${usage.definitionId}"`,
        value: usage.definitionId
      });
    }
  });
  
  // Check for orphaned definitions (definitions with no usages)
  Object.values(system.library).forEach(definition => {
    const hasUsages = Object.values(system.registry).some(usage => usage.definitionId === definition.id);
    if (!hasUsages) {
      errors.push({
        field: 'usage',
        message: `Definition "${definition.id}" has no usages`,
        value: definition.id
      });
    }
  });
  
  return errors;
};

// Get usage statistics for a definition
export const getDefinitionUsageStats = (
  definitionId: string,
  system: ComponentSystem
): {
  totalUsages: number;
  usagesByFile: Record<string, number>;
  usagesByCategory: Record<string, number>;
} => {
  const usages = Object.values(system.registry).filter(usage => usage.definitionId === definitionId);
  
  const usagesByFile = usages.reduce((acc, usage) => {
    acc[usage.filePath] = (acc[usage.filePath] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const usagesByCategory = usages.reduce((acc, usage) => {
    acc[usage.category] = (acc[usage.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalUsages: usages.length,
    usagesByFile,
    usagesByCategory,
  };
};

