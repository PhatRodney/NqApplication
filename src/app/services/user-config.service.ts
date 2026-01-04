import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserConfig, DEFAULT_USER_CONFIG } from '../models/user-config.model';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  private config: UserConfig = DEFAULT_USER_CONFIG;

  constructor() {
    this.loadConfig();
  }

  /**
   * Load user configuration from storage or API
   * In a real application, this would fetch from a database or API endpoint
   */
  loadConfig(): void {
    const storedConfig = localStorage.getItem('userConfig');
    if (storedConfig) {
      try {
        this.config = { ...DEFAULT_USER_CONFIG, ...JSON.parse(storedConfig) };
      } catch (e) {
        console.error('Error loading user config:', e);
        this.config = DEFAULT_USER_CONFIG;
      }
    }
  }

  /**
   * Get the current user configuration
   */
  getConfig(): Observable<UserConfig> {
    return of(this.config).pipe(delay(100));
  }

  /**
   * Update user configuration
   * In a real application, this would persist to a database or API
   */
  updateConfig(config: Partial<UserConfig>): Observable<UserConfig> {
    this.config = { ...this.config, ...config };
    localStorage.setItem('userConfig', JSON.stringify(this.config));
    return of(this.config).pipe(delay(100));
  }

  /**
   * Apply theme to the document
   */
  applyTheme(): void {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', this.config.primaryColor);
    root.style.setProperty('--secondary-color', this.config.secondaryColor);
    root.style.setProperty('--background-color', this.config.backgroundColor);
  }
}
