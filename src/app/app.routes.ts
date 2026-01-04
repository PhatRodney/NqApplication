import { Routes } from '@angular/router';
import { msalGuard } from './guards/msal.guard';
import { LoginComponent } from './components/login/login.component';
import { SignageDisplayComponent } from './components/signage-display/signage-display.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signage',
    component: SignageDisplayComponent,
    canActivate: [msalGuard]
  }
];
