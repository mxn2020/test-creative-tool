// This file is auto-generated from JSON registry data
// Generated on 2025-07-25T09:05:55.600Z
// DO NOT EDIT MANUALLY - Run 'npm run generate-types' to regenerate

export type ComponentRegistryId = 
  | 'app-root'
  | 'auth-buttons'
  | 'brand-name'
  | 'cta-join-community'
  | 'cta-section'
  | 'cta-start-project'
  | 'dashboard-content'
  | 'dashboard-header'
  | 'dashboard-loading'
  | 'dashboard-page'
  | 'dashboard-stats'
  | 'dashboard-unauthorized'
  | 'docs-button'
  | 'feature-card-0'
  | 'feature-card-1'
  | 'feature-card-2'
  | 'feature-card-3'
  | 'feature-card-content-0'
  | 'feature-card-content-1'
  | 'feature-card-content-2'
  | 'feature-card-content-3'
  | 'features-section'
  | 'hero-content'
  | 'hero-content-wrapper'
  | 'hero-cta-buttons'
  | 'hero-description'
  | 'hero-github-button'
  | 'hero-section'
  | 'hero-start-building'
  | 'hero-title'
  | 'landing-page-root'
  | 'login-divider'
  | 'login-error'
  | 'login-footer'
  | 'login-form'
  | 'login-header'
  | 'login-page'
  | 'logo-section'
  | 'main-footer'
  | 'main-header'
  | 'main-nav'
  | 'main-wrapper'
  | 'mongodb-highlight'
  | 'nav-actions'
  | 'nav-dashboard-button'
  | 'nav-login-button'
  | 'nav-register-button'
  | 'protected-route-loading'
  | 'register-divider'
  | 'register-error'
  | 'register-footer'
  | 'register-form'
  | 'register-header'
  | 'register-page'
  | 'social-login-buttons'
  | 'social-register-buttons'
  | 'stat-card-0'
  | 'stat-card-1'
  | 'stat-card-2'
  | 'stat-card-3'
  | 'stats-content'
  | 'stats-grid'
  | 'stats-section'
  | 'tech-badge-0'
  | 'tech-badge-1'
  | 'tech-badge-2'
  | 'tech-badge-3'
  | 'tech-badge-4'
  | 'tech-badge-5'
  | 'tech-letter-0'
  | 'tech-letter-1'
  | 'tech-letter-2'
  | 'tech-letter-3'
  | 'tech-letter-4'
  | 'tech-letter-5'
  | 'tech-stack-section'
  | 'user-profile-card'
  | 'user-section'
  | 'welcome-message'

// Runtime validation array
export const VALID_COMPONENT_IDS = [
  '__geenius-system__',
  'app-root',
  'auth-buttons',
  'brand-name',
  'cta-join-community',
  'cta-section',
  'cta-start-project',
  'dashboard-content',
  'dashboard-header',
  'dashboard-loading',
  'dashboard-page',
  'dashboard-stats',
  'dashboard-unauthorized',
  'docs-button',
  'feature-card-0',
  'feature-card-1',
  'feature-card-2',
  'feature-card-3',
  'feature-card-content-0',
  'feature-card-content-1',
  'feature-card-content-2',
  'feature-card-content-3',
  'features-section',
  'hero-content',
  'hero-content-wrapper',
  'hero-cta-buttons',
  'hero-description',
  'hero-github-button',
  'hero-section',
  'hero-start-building',
  'hero-title',
  'landing-page-root',
  'login-divider',
  'login-error',
  'login-footer',
  'login-form',
  'login-header',
  'login-page',
  'logo-section',
  'main-footer',
  'main-header',
  'main-nav',
  'main-wrapper',
  'mongodb-highlight',
  'nav-actions',
  'nav-dashboard-button',
  'nav-login-button',
  'nav-register-button',
  'protected-route-loading',
  'register-divider',
  'register-error',
  'register-footer',
  'register-form',
  'register-header',
  'register-page',
  'social-login-buttons',
  'social-register-buttons',
  'stat-card-0',
  'stat-card-1',
  'stat-card-2',
  'stat-card-3',
  'stats-content',
  'stats-grid',
  'stats-section',
  'tech-badge-0',
  'tech-badge-1',
  'tech-badge-2',
  'tech-badge-3',
  'tech-badge-4',
  'tech-badge-5',
  'tech-letter-0',
  'tech-letter-1',
  'tech-letter-2',
  'tech-letter-3',
  'tech-letter-4',
  'tech-letter-5',
  'tech-stack-section',
  'user-profile-card',
  'user-section',
  'welcome-message',
] as const;

// Type guard for runtime validation
export function isValidComponentId(id: string): id is ComponentRegistryId {
  return VALID_COMPONENT_IDS.includes(id as ComponentRegistryId);
}

// Helper to validate component ID with helpful error messages
export function validateComponentId(id: string): asserts id is ComponentRegistryId {
  if (!isValidComponentId(id)) {
    const suggestions = VALID_COMPONENT_IDS
      .filter(validId => validId !== '__geenius-system__')
      .filter(validId => validId.includes(id) || id.includes(validId))
      .slice(0, 5);
    
    const suggestionText = suggestions.length > 0 
      ? `\nDid you mean: ${suggestions.join(', ')}?`
      : '';
    
    throw new Error(
      `Invalid component ID: "${id}"${suggestionText}\n` +
      `Available IDs: ${VALID_COMPONENT_IDS.slice(0, 10).join(', ')}` +
      `${VALID_COMPONENT_IDS.length > 10 ? ` ... and ${VALID_COMPONENT_IDS.length - 10} more` : ''}`
    );
  }
}

// Export count for debugging
export const COMPONENT_ID_COUNT = 75;
