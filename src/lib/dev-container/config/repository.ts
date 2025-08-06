/**
 * Repository configuration for AI agents
 * Update these values to match your GitHub repository
 */

export interface RepositoryConfiguration {
  owner: string;
  repository: string;
  branch: string;
  baseUrl: string;
}

/**
 * CONFIGURE YOUR REPOSITORY HERE
 * 
 * Update these values to match your actual GitHub repository
 * This helps AI agents locate files in your repository
 */
export const REPOSITORY_CONFIG: RepositoryConfiguration = {
  owner: 'your-username',           // Your GitHub username or organization
  repository: 'geenius-template-vite-react-mongo',  // Your repository name
  branch: 'main',                   // Your default branch (usually 'main' or 'master')
  baseUrl: 'https://github.com'     // GitHub base URL (usually don't change this)
};

/**
 * Generates a full GitHub repository URL for a file path
 */
export function generateGitHubURL(filePath: string): string {
  // Ensure the path doesn't start with a slash
  const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
  
  // Ensure the path starts with src/ if it's a source file
  let fullPath = cleanPath;
  if (!fullPath.startsWith('src/') && 
      !fullPath.startsWith('public/') && 
      !fullPath.startsWith('docs/') &&
      !fullPath.startsWith('package.json')) {
    
    // If it's a relative path, assume it's in src/
    if (fullPath.startsWith('lib/') || 
        fullPath.startsWith('components/') || 
        fullPath.startsWith('pages/') ||
        fullPath.startsWith('utils/')) {
      fullPath = `src/${fullPath}`;
    }
  }
  
  return `${REPOSITORY_CONFIG.baseUrl}/${REPOSITORY_CONFIG.owner}/${REPOSITORY_CONFIG.repository}/blob/${REPOSITORY_CONFIG.branch}/${fullPath}`;
}

/**
 * Quick setup function to update repository configuration
 * Call this in your main app setup to configure the repository
 */
export function configureRepository(config: Partial<RepositoryConfiguration>): void {
  Object.assign(REPOSITORY_CONFIG, config);
}

/**
 * Example usage:
 * 
 * // In your main app or config file:
 * import { configureRepository } from './lib/dev-container/config/repository';
 * 
 * configureRepository({
 *   owner: 'your-github-username',
 *   repository: 'your-repo-name',
 *   branch: 'main'
 * });
 */