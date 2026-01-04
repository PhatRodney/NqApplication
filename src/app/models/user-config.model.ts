export interface UserConfig {
  storeName: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  logoUrl?: string;
  scrollSpeed: number; // pixels per second
  scrollDelay: number; // milliseconds before restarting scroll
}

export const DEFAULT_USER_CONFIG: UserConfig = {
  storeName: 'My Store',
  primaryColor: '#1976d2',
  secondaryColor: '#424242',
  backgroundColor: '#ffffff',
  scrollSpeed: 50,
  scrollDelay: 2000
};
