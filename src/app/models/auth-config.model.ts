import { Configuration, LogLevel } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

/**
 * MSAL Configuration
 * To use this with your Azure AD B2C or Azure AD tenant:
 * 1. Register an app in Azure Portal
 * 2. Update the environment.ts file with your Application (client) ID and Tenant ID
 * 3. Add http://localhost:4200 as a redirect URI in your app registration
 * 
 * For production, set environment variables:
 * - AZURE_CLIENT_ID: Your Application (client) ID
 * - AZURE_TENANT_ID: Your Directory (tenant) ID
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.msalConfig.clientId,
    authority: `https://login.microsoftonline.com/${environment.msalConfig.tenantId}`,
    redirectUri: environment.production ? window.location.origin : 'http://localhost:4200',
    postLogoutRedirectUri: environment.production ? window.location.origin : 'http://localhost:4200'
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

