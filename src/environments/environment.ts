/**
 * Environment configuration
 * Set demoMode to true to bypass MSAL authentication for testing
 */
export const environment = {
  production: false,
  demoMode: true, // Set to false when using real MSAL authentication
  apiUrl: 'http://localhost:3000/api' // Update with your API endpoint
};
