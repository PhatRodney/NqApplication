/**
 * Environment configuration
 * Set demoMode to true to bypass MSAL authentication for testing
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

