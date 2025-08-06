/**
 * Utility functions for generating full repository paths for AI agents
 * These paths help AI agents locate files in the GitHub repository
 * Updated to work with the new ComponentDefinition/ComponentUsage split
 */

import { REPOSITORY_CONFIG, generateGitHubURL } from '../config/repository';
import { ComponentDefinition, ComponentUsage, ComponentSystem } from '../types';

/**
 * Configuration for repository path generation
 */
interface RepositoryConfig {
  owner: string;
  repo: string;
  branch?: string;
  baseUrl?: string;
}

// Default repository configuration - uses the centralized config
const DEFAULT_REPO_CONFIG: RepositoryConfig = {
  owner: REPOSITORY_CONFIG.owner,
  repo: REPOSITORY_CONFIG.repository,
  branch: REPOSITORY_CONFIG.branch,
  baseUrl: REPOSITORY_CONFIG.baseUrl
};

/**
 * Converts a local file path to a full repository path
 */
export function generateRepositoryPath(
  localPath: string, 
  config: Partial<RepositoryConfig> = {}
): string {
  // Use the centralized GitHub URL generator if no custom config provided
  if (Object.keys(config).length === 0) {
    return generateGitHubURL(localPath);
  }
  
  // Fallback to original logic for custom configs
  const repoConfig = { ...DEFAULT_REPO_CONFIG, ...config };
  
  // Clean the local path
  let cleanPath = localPath;
  
  // Remove leading slash if present
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  // Ensure the path starts with src/ if it's a source file
  if (!cleanPath.startsWith('src/') && !cleanPath.startsWith('public/') && !cleanPath.startsWith('docs/')) {
    // If it's a relative path like 'components/Button.tsx', assume it's in src/
    if (!cleanPath.includes('/')) {
      cleanPath = `src/${cleanPath}`;
    } else if (cleanPath.startsWith('lib/') || cleanPath.startsWith('components/') || cleanPath.startsWith('pages/')) {
      cleanPath = `src/${cleanPath}`;
    }
  }
  
  return `${repoConfig.baseUrl}/${repoConfig.owner}/${repoConfig.repo}/blob/${repoConfig.branch}/${cleanPath}`;
}

/**
 * Converts a local file path to a raw repository path (for direct file access)
 */
export function generateRawRepositoryPath(
  localPath: string, 
  config: Partial<RepositoryConfig> = {}
): string {
  const repoConfig = { ...DEFAULT_REPO_CONFIG, ...config };
  
  let cleanPath = localPath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  if (!cleanPath.startsWith('src/') && !cleanPath.startsWith('public/') && !cleanPath.startsWith('docs/')) {
    if (!cleanPath.includes('/')) {
      cleanPath = `src/${cleanPath}`;
    } else if (cleanPath.startsWith('lib/') || cleanPath.startsWith('components/') || cleanPath.startsWith('pages/')) {
      cleanPath = `src/${cleanPath}`;
    }
  }
  
  return `https://raw.githubusercontent.com/${repoConfig.owner}/${repoConfig.repo}/${repoConfig.branch}/${cleanPath}`;
}

/**
 * Extracts just the repository file path without the full URL
 */
export function getRepositoryFilePath(
  localPath: string
): string {
  let cleanPath = localPath;
  
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  if (!cleanPath.startsWith('src/') && !cleanPath.startsWith('public/') && !cleanPath.startsWith('docs/')) {
    if (!cleanPath.includes('/')) {
      cleanPath = `src/${cleanPath}`;
    } else if (cleanPath.startsWith('lib/') || cleanPath.startsWith('components/') || cleanPath.startsWith('pages/')) {
      cleanPath = `src/${cleanPath}`;
    }
  }
  
  return cleanPath;
}

// =====================================
// NEW: COMPONENT SYSTEM SPECIFIC FUNCTIONS
// =====================================

/**
 * Generates repository paths for a ComponentDefinition
 * Automatically adds the repositoryPath if missing
 */
export function enrichComponentDefinition(definition: ComponentDefinition): ComponentDefinition {
  const enriched = { ...definition };
  
  if (!enriched.repositoryPath) {
    enriched.repositoryPath = generateRepositoryPath(definition.componentPath);
  }
  
  return enriched;
}

/**
 * Generates repository paths for a ComponentUsage
 * Automatically adds the repositoryPath if missing
 */
export function enrichComponentUsage(usage: ComponentUsage): ComponentUsage {
  const enriched = { ...usage };
  
  if (!enriched.repositoryPath) {
    enriched.repositoryPath = generateRepositoryPath(usage.filePath);
  }
  
  return enriched;
}

/**
 * Enriches an entire ComponentSystem with repository paths
 */
export function enrichComponentSystem(system: ComponentSystem): ComponentSystem {
  const enrichedLibrary = Object.fromEntries(
    Object.entries(system.library).map(([id, definition]) => [
      id,
      enrichComponentDefinition(definition)
    ])
  );
  
  const enrichedRegistry = Object.fromEntries(
    Object.entries(system.registry).map(([id, usage]) => [
      id,
      enrichComponentUsage(usage)
    ])
  );
  
  return {
    library: enrichedLibrary,
    registry: enrichedRegistry
  };
}

/**
 * Gets both definition and usage repository paths for a component
 */
export function getComponentRepositoryPaths(
  usageId: string,
  system: ComponentSystem
): {
  definitionPath?: string;
  usagePath?: string;
  definitionRawPath?: string;
  usageRawPath?: string;
} | null {
  const usage = system.registry[usageId];
  if (!usage) return null;
  
  const definition = system.library[usage.definitionId];
  if (!definition) return null;
  
  return {
    definitionPath: definition.repositoryPath || generateRepositoryPath(definition.componentPath),
    usagePath: usage.repositoryPath || generateRepositoryPath(usage.filePath),
    definitionRawPath: generateRawRepositoryPath(definition.componentPath),
    usageRawPath: generateRawRepositoryPath(usage.filePath)
  };
}

/**
 * Generates a comprehensive file context for AI agents
 */
export function generateComponentContext(
  usageId: string,
  system: ComponentSystem
): {
  usage: ComponentUsage;
  definition: ComponentDefinition;
  paths: {
    definitionFile: string;
    usageFile: string;
    definitionRepo: string;
    usageRepo: string;
    definitionRaw: string;
    usageRaw: string;
  };
} | null {
  const usage = system.registry[usageId];
  if (!usage) return null;
  
  const definition = system.library[usage.definitionId];
  if (!definition) return null;
  
  return {
    usage,
    definition,
    paths: {
      definitionFile: definition.componentPath,
      usageFile: usage.filePath,
      definitionRepo: definition.repositoryPath || generateRepositoryPath(definition.componentPath),
      usageRepo: usage.repositoryPath || generateRepositoryPath(usage.filePath),
      definitionRaw: generateRawRepositoryPath(definition.componentPath),
      usageRaw: generateRawRepositoryPath(usage.filePath)
    }
  };
}

// =====================================
// ORIGINAL FUNCTIONS (unchanged)
// =====================================

/**
 * Auto-detects repository information from package.json or git remote
 * This is a simplified version - in a real implementation, you might read from package.json
 */
export function autoDetectRepositoryConfig(): Partial<RepositoryConfig> {
  // In a real implementation, you could:
  // 1. Read from package.json repository field
  // 2. Parse git remote URL
  // 3. Use environment variables
  
  // For now, return the default config
  return DEFAULT_REPO_CONFIG;
}

/**
 * Updates the default repository configuration
 */
export function updateRepositoryConfig(config: Partial<RepositoryConfig>): void {
  Object.assign(DEFAULT_REPO_CONFIG, config);
}

/**
 * Gets the current repository configuration
 */
export function getRepositoryConfig(): RepositoryConfig {
  return { ...DEFAULT_REPO_CONFIG };
}

// =====================================
// BULK OPERATIONS
// =====================================

/**
 * Batch generates repository paths for multiple definitions
 */
export function bulkEnrichDefinitions(definitions: ComponentDefinition[]): ComponentDefinition[] {
  return definitions.map(enrichComponentDefinition);
}

/**
 * Batch generates repository paths for multiple usages
 */
export function bulkEnrichUsages(usages: ComponentUsage[]): ComponentUsage[] {
  return usages.map(enrichComponentUsage);
}

/**
 * Validates that all repository paths are correctly formatted
 */
export function validateRepositoryPaths(system: ComponentSystem): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check definitions
  Object.values(system.library).forEach(definition => {
    if (definition.repositoryPath && !isValidGitHubUrl(definition.repositoryPath)) {
      errors.push(`Invalid repository path for definition "${definition.id}": ${definition.repositoryPath}`);
    }
  });
  
  // Check usages
  Object.values(system.registry).forEach(usage => {
    if (usage.repositoryPath && !isValidGitHubUrl(usage.repositoryPath)) {
      errors.push(`Invalid repository path for usage "${usage.id}": ${usage.repositoryPath}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Simple validation for GitHub URLs
 */
function isValidGitHubUrl(url: string): boolean {
  return url.startsWith('https://github.com/') && url.includes('/blob/');
}