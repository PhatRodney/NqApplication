import { Configuration, LogLevel } from '@azure/msal-browser';

/**
 * MSAL Configuration
 * To use this with your Azure AD B2C or Azure AD tenant:
 * 1. Register an app in Azure Portal
 * 2. Update the clientId with your Application (client) ID
 * 3. Update the authority with your tenant information
 * 4. Add http://localhost:4200 as a redirect URI in your app registration
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID_HERE', // Replace with your client ID from Azure Portal
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID_HERE', // Replace with your tenant
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Info
    }
  }
};

export const loginRequest = {
  scopes: ['user.read']
};

export const protectedResources = {
  apiEndpoint: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['user.read']
  }
};
