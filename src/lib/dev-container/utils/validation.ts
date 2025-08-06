// Enhanced validation utilities for the new ComponentDefinition/ComponentUsage system

import { ComponentRegistry, ComponentLibrary, ComponentUsage, ComponentDefinition, ComponentSystem } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface RegistryValidationOptions {
  strict?: boolean; // Throw errors on validation failures
  checkDuplicates?: boolean; // Check for duplicate component IDs
  checkFilePaths?: boolean; // Validate that file paths exist (would require fs access)
  checkReferences?: boolean; // Check that usage definitions exist in library
}

export interface SystemValidationOptions extends RegistryValidationOptions {
  checkOrphans?: boolean; // Check for definitions without usages
  checkMissingDefinitions?: boolean; // Check for usages without definitions
}

// =====================================
// REGISTRY VALIDATION
// =====================================

/**
 * Validates a component registry for common issues
 */
export function validateRegistry(
  registry: ComponentRegistry, 
  options: RegistryValidationOptions = {}
): ValidationResult {
  const {
    strict = false,
    checkDuplicates = true,
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenPaths = new Set<string>();

  // Check each component in the registry
  Object.entries(registry).forEach(([id, usage]) => {
    // Check for duplicate IDs
    if (checkDuplicates && seenIds.has(id)) {
      errors.push(`Duplicate component usage ID: "${id}"`);
    }
    seenIds.add(id);

    // Validate component usage metadata
    validateComponentUsage(usage, errors, warnings);

    // Check for duplicate file paths (multiple components in same file is OK)
    if (usage.filePath && seenPaths.has(usage.filePath)) {
      // This is just informational, not an error
    }
    if (usage.filePath) {
      seenPaths.add(usage.filePath);
    }

    // Validate ID format (kebab-case recommended)
    if (!/^[a-z0-9-]+$/.test(id)) {
      warnings.push(`Component usage ID "${id}" should use kebab-case (lowercase letters, numbers, and hyphens only)`);
    }
  });

  const result: ValidationResult = {
    isValid: errors.length === 0,
    errors,
    warnings,
  };

  // If strict mode is enabled and there are errors, throw
  if (strict && !result.isValid) {
    throw new Error(`Registry validation failed:\n${errors.join('\n')}`);
  }

  return result;
}

// =====================================
// NEW: COMPONENT LIBRARY VALIDATION
// =====================================

/**
 * Validates a component library for common issues
 */
export function validateLibrary(
  library: ComponentLibrary,
  options: RegistryValidationOptions = {}
): ValidationResult {
  const {
    strict = false,
    checkDuplicates = true,
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenPaths = new Set<string>();

  // Check each definition in the library
  Object.entries(library).forEach(([id, definition]) => {
    // Check for duplicate IDs
    if (checkDuplicates && seenIds.has(id)) {
      errors.push(`Duplicate component definition ID: "${id}"`);
    }
    seenIds.add(id);

    // Validate component definition metadata
    validateComponentDefinition(definition, errors, warnings);

    // Check for duplicate component paths
    if (definition.componentPath && seenPaths.has(definition.componentPath)) {
      warnings.push(`Multiple definitions reference the same componentPath: "${definition.componentPath}"`);
    }
    if (definition.componentPath) {
      seenPaths.add(definition.componentPath);
    }

    // Validate ID format (kebab-case recommended)
    if (!/^[a-z0-9-]+$/.test(id)) {
      warnings.push(`Component definition ID "${id}" should use kebab-case (lowercase letters, numbers, and hyphens only)`);
    }
  });

  const result: ValidationResult = {
    isValid: errors.length === 0,
    errors,
    warnings,
  };

  if (strict && !result.isValid) {
    throw new Error(`Library validation failed:\n${errors.join('\n')}`);
  }

  return result;
}

// =====================================
// NEW: COMPONENT SYSTEM VALIDATION
// =====================================

/**
 * Validates the entire component system (library + registry)
 */
export function validateComponentSystem(
  system: ComponentSystem,
  options: SystemValidationOptions = {}
): ValidationResult {
  const {
    strict = false,
    checkOrphans = true,
    checkMissingDefinitions = true,
    ...baseOptions
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate library
  const libraryResult = validateLibrary(system.library, baseOptions);
  errors.push(...libraryResult.errors);
  warnings.push(...libraryResult.warnings);

  // Validate registry
  const registryResult = validateRegistry(system.registry, baseOptions);
  errors.push(...registryResult.errors);
  warnings.push(...registryResult.warnings);

  // Check references between library and registry
  if (checkMissingDefinitions) {
    Object.values(system.registry).forEach(usage => {
      if (!system.library[usage.definitionId]) {
        errors.push(`Usage "${usage.id}" references non-existent definition "${usage.definitionId}"`);
      }
    });
  }

  // Check for orphaned definitions
  if (checkOrphans) {
    Object.values(system.library).forEach(definition => {
      const hasUsages = Object.values(system.registry).some(usage => 
        usage.definitionId === definition.id
      );
      if (!hasUsages) {
        warnings.push(`Definition "${definition.id}" has no usages`);
      }
    });
  }

  // Check for inconsistent metadata
  Object.values(system.registry).forEach(usage => {
    const definition = system.library[usage.definitionId];
    if (definition) {
      // Warn if categories don't match
      if (usage.category !== definition.category) {
        warnings.push(
          `Usage "${usage.id}" category "${usage.category}" differs from definition "${definition.id}" category "${definition.category}"`
        );
      }
    }
  });

  const result: ValidationResult = {
    isValid: errors.length === 0,
    errors,
    warnings,
  };

  if (strict && !result.isValid) {
    throw new Error(`Component system validation failed:\n${errors.join('\n')}`);
  }

  return result;
}

// =====================================
// INDIVIDUAL VALIDATION FUNCTIONS
// =====================================

function validateComponentUsage(usage: ComponentUsage, errors: string[], warnings: string[]): void {
  if (!usage.id?.trim()) {
    errors.push(`Component usage has missing or empty ID`);
  }

  if (!usage.definitionId?.trim()) {
    errors.push(`Component usage "${usage.id}" has missing or empty definitionId`);
  }

  if (!usage.name?.trim()) {
    errors.push(`Component usage "${usage.id}" has missing or empty name`);
  }

  if (!usage.description?.trim()) {
    warnings.push(`Component usage "${usage.id}" has missing or empty description`);
  }

  if (!usage.filePath?.trim()) {
    errors.push(`Component usage "${usage.id}" has missing or empty filePath`);
  }

  if (!usage.category) {
    warnings.push(`Component usage "${usage.id}" has missing category`);
  }

  if (!usage.semanticTags || usage.semanticTags.length === 0) {
    warnings.push(`Component usage "${usage.id}" has no semantic tags`);
  }

  // Validate file path format
  if (usage.filePath && !/\.(tsx?|jsx?)$/.test(usage.filePath)) {
    warnings.push(`Component usage "${usage.id}" filePath should end with .tsx, .ts, .jsx, or .js`);
  }
}

function validateComponentDefinition(definition: ComponentDefinition, errors: string[], warnings: string[]): void {
  if (!definition.id?.trim()) {
    errors.push(`Component definition has missing or empty ID`);
  }

  if (!definition.name?.trim()) {
    errors.push(`Component definition "${definition.id}" has missing or empty name`);
  }

  if (!definition.description?.trim()) {
    warnings.push(`Component definition "${definition.id}" has missing or empty description`);
  }

  if (!definition.componentPath?.trim()) {
    errors.push(`Component definition "${definition.id}" has missing or empty componentPath`);
  }

  if (!definition.category) {
    warnings.push(`Component definition "${definition.id}" has missing category`);
  }

  if (!definition.semanticTags || definition.semanticTags.length === 0) {
    warnings.push(`Component definition "${definition.id}" has no semantic tags`);
  }

  // Validate component path format
  if (definition.componentPath && !/\.(tsx?|jsx?)$/.test(definition.componentPath)) {
    warnings.push(`Component definition "${definition.id}" componentPath should end with .tsx, .ts, .jsx, or .js`);
  }

  // Validate that it's in the dev-container folder
  if (definition.componentPath && !definition.componentPath.includes('dev-container/')) {
    warnings.push(`Component definition "${definition.id}" componentPath should be in the dev-container folder`);
  }
}

// =====================================
// ENHANCED ID VALIDATION
// =====================================

/**
 * Validates that a component usage ID exists in the registry
 */
export function validateComponentUsageId(
  usageId: string, 
  registry: ComponentRegistry,
  throwOnError = false
): boolean {
  const exists = usageId in registry;
  
  if (!exists && throwOnError) {
    const availableIds = Object.keys(registry).sort();
    const suggestions = suggestSimilarComponentIds(usageId, registry);
    
    let errorMessage = `Component usage ID "${usageId}" not found in registry.\n\n`;
    
    if (suggestions.length > 0) {
      errorMessage += `Did you mean?\n${suggestions.map(id => `  - ${id}`).join('\n')}\n\n`;
    }
    
    errorMessage += `Available usage IDs:\n${availableIds.slice(0, 10).map(id => `  - ${id}`).join('\n')}`;
    if (availableIds.length > 10) {
      errorMessage += `\n  ... and ${availableIds.length - 10} more`;
    }
    
    errorMessage += `\n\nPlease add this component usage to your registry.`;
    
    throw new Error(errorMessage);
  }
  
  return exists;
}

/**
 * Validates that a component definition ID exists in the library
 */
export function validateComponentDefinitionId(
  definitionId: string, 
  library: ComponentLibrary,
  throwOnError = false
): boolean {
  const exists = definitionId in library;
  
  if (!exists && throwOnError) {
    const availableIds = Object.keys(library).sort();
    const suggestions = suggestSimilarComponentIds(definitionId, library);
    
    let errorMessage = `Component definition ID "${definitionId}" not found in library.\n\n`;
    
    if (suggestions.length > 0) {
      errorMessage += `Did you mean?\n${suggestions.map(id => `  - ${id}`).join('\n')}\n\n`;
    }
    
    errorMessage += `Available definition IDs:\n${availableIds.slice(0, 10).map(id => `  - ${id}`).join('\n')}`;
    if (availableIds.length > 10) {
      errorMessage += `\n  ... and ${availableIds.length - 10} more`;
    }
    
    errorMessage += `\n\nPlease add this component definition to your library.`;
    
    throw new Error(errorMessage);
  }
  
  return exists;
}

/**
 * Helper to suggest similar component IDs when one is not found
 */
export function suggestSimilarComponentIds(
  targetId: string, 
  source: ComponentRegistry | ComponentLibrary,
  maxSuggestions = 3
): string[] {
  const availableIds = Object.keys(source);
  
  // Simple similarity check based on string distance
  const suggestions = availableIds
    .map(id => ({
      id,
      similarity: calculateSimilarity(targetId, id)
    }))
    .filter(item => item.similarity > 0.3) // Only suggest if reasonably similar
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxSuggestions)
    .map(item => item.id);
    
  return suggestions;
}

/**
 * Simple string similarity calculation (Jaccard similarity)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase().split(''));
  const set2 = new Set(str2.toLowerCase().split(''));
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

// =====================================
// ENHANCED STATISTICS
// =====================================

/**
 * Development helper to log component system statistics
 */
export function logComponentSystemStats(system: ComponentSystem): void {
  const libraryStats = {
    totalDefinitions: Object.keys(system.library).length,
    categories: {} as Record<string, number>,
    byFolder: {} as Record<string, number>,
  };
  
  const registryStats = {
    totalUsages: Object.keys(system.registry).length,
    categories: {} as Record<string, number>,
    byFile: {} as Record<string, number>,
    orphanedUsages: 0,
  };
  
  // Analyze library
  Object.values(system.library).forEach(definition => {
    const category = definition.category || 'uncategorized';
    libraryStats.categories[category] = (libraryStats.categories[category] || 0) + 1;
    
    const folder = definition.componentPath.split('/')[2] || 'unknown'; // e.g., 'shadcn' or 'geenius'
    libraryStats.byFolder[folder] = (libraryStats.byFolder[folder] || 0) + 1;
  });
  
  // Analyze registry
  Object.values(system.registry).forEach(usage => {
    const category = usage.category || 'uncategorized';
    registryStats.categories[category] = (registryStats.categories[category] || 0) + 1;
    
    if (usage.filePath) {
      registryStats.byFile[usage.filePath] = (registryStats.byFile[usage.filePath] || 0) + 1;
    }
    
    if (!system.library[usage.definitionId]) {
      registryStats.orphanedUsages++;
    }
  });
  
  console.group('📊 Component System Statistics');
  
  console.group('📚 Component Library');
  console.log(`Total Definitions: ${libraryStats.totalDefinitions}`);
  console.log('By Category:', libraryStats.categories);
  console.log('By Folder:', libraryStats.byFolder);
  console.groupEnd();
  
  console.group('🏗️ Component Registry');
  console.log(`Total Usages: ${registryStats.totalUsages}`);
  console.log('By Category:', registryStats.categories);
  console.log(`Files with Components: ${Object.keys(registryStats.byFile).length}`);
  if (registryStats.orphanedUsages > 0) {
    console.warn(`⚠️ Orphaned Usages: ${registryStats.orphanedUsages}`);
  }
  console.groupEnd();
  
  console.groupEnd();
}

/**
 * Get validation summary for the system
 */
export function getValidationSummary(system: ComponentSystem): {
  library: ValidationResult;
  registry: ValidationResult;
  system: ValidationResult;
  overall: boolean;
} {
  const library = validateLibrary(system.library);
  const registry = validateRegistry(system.registry);
  const systemResult = validateComponentSystem(system);
  
  return {
    library,
    registry,
    system: systemResult,
    overall: library.isValid && registry.isValid && systemResult.isValid
  };
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}