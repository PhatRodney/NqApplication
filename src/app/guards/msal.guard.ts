import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';

export const msalGuard: CanActivateFn = () => {
  // In demo mode, bypass authentication
  if (environment.demoMode) {
    return true;
  }

  const msalService = inject(MsalService);
  const router = inject(Router);

  const activeAccount = msalService.instance.getActiveAccount();

  if (!activeAccount) {
    // No active account, try to get all accounts
    const accounts = msalService.instance.getAllAccounts();
    
    if (accounts.length > 0) {
      // Set the first account as active
      msalService.instance.setActiveAccount(accounts[0]);
      return true;
    }

    // No accounts found, initiate login
    msalService.loginRedirect();
    return false;
  }

  return true;
};

