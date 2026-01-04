/**
 * Environment configuration template
 * 
 * This file serves as a template for environment configuration.
 * Copy this file to create your own environment configuration:
 * 
 * For development: Update src/environments/environment.ts
 * For production: Update src/environments/environment.prod.ts
 * 
 * IMPORTANT: Never commit real credentials to version control!
 */
export const environment = {
  production: false,
  demoMode: true, // Set to false when using real MSAL authentication
  apiUrl: 'http://localhost:3000/api', // Update with your API endpoint
  msalConfig: {
    clientId: 'YOUR_CLIENT_ID_HERE', // Replace with your Azure AD client ID
    tenantId: 'YOUR_TENANT_ID_HERE'  // Replace with your Azure AD tenant ID
  }
};
