/**
 * Production environment configuration
 * 
 * Note: Update these values before deploying to production.
 * For security, consider using a build-time replacement strategy
 * or loading configuration from a secure endpoint at runtime.
 */
export const environment = {
  production: true,
  demoMode: false,
  apiUrl: '/api',
  msalConfig: {
    clientId: '', // Set this during build or via configuration service
    tenantId: ''  // Set this during build or via configuration service
  }
};


