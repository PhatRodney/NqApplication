# NqApplication - Digital Signage App

An Angular application with MSAL OAuth authentication that displays products in a digital signage format.

## Features

- **MSAL Authentication**: Secure authentication using Microsoft Azure Active Directory
- **User Configuration**: Customizable look and feel loaded from storage/database
- **Product Display**: Products organized by category and displayed in an auto-scrolling layout
- **Digital Signage**: Continuous auto-scroll that loops back to the beginning
- **Responsive Design**: Optimized for large display devices
- **Demo Mode**: Test the application without Azure AD configuration

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- An Azure AD application registration (for production use)

## Azure AD Setup

### Development

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Enter a name (e.g., "NQ Signage App")
5. Select "Accounts in this organizational directory only"
6. Add redirect URI: `http://localhost:4200` (type: Single-page application)
7. Click "Register"
8. Copy the **Application (client) ID** and **Directory (tenant) ID**
9. Update `src/environments/environment.ts`:
   ```typescript
   msalConfig: {
     clientId: 'your-client-id-here',
     tenantId: 'your-tenant-id-here'
   }
   ```
10. Set `demoMode: false` in `src/environments/environment.ts`

### Production

For production deployments, use environment variables:

```bash
export AZURE_CLIENT_ID=your-client-id-here
export AZURE_TENANT_ID=your-tenant-id-here
```

The production build will automatically use these environment variables.

## Installation

```bash
npm install
```

## Development

### Demo Mode (No Azure AD Required)

The application ships with demo mode enabled by default. Simply run:

```bash
npm start
```

Navigate to `http://localhost:4200/`. You can access the signage display without authentication.

### With Azure AD Authentication

1. Configure Azure AD as described above
2. Set `demoMode: false` in `src/environments/environment.ts`
3. Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. You'll be prompted to sign in with Microsoft.

## Configuration

### User Configuration

The app supports customizable themes and behavior through the `UserConfig` model:

- `storeName`: Display name for the store
- `primaryColor`: Primary brand color
- `secondaryColor`: Secondary color for text
- `backgroundColor`: Background color
- `logoUrl`: Optional logo URL
- `scrollSpeed`: Scroll speed in pixels per second (default: 50)
- `scrollDelay`: Delay before restarting scroll in milliseconds (default: 2000)

Configuration is stored in localStorage and can be updated through the `UserConfigService`.

Example configuration:
```typescript
{
  storeName: 'My Store',
  primaryColor: '#1976d2',
  secondaryColor: '#424242',
  backgroundColor: '#ffffff',
  scrollSpeed: 50,
  scrollDelay: 2000
}
```

### Product Data

Products are currently loaded from mock data in `ProductService`. To connect to a real API:

1. Update the `getProductsByCategory()` method in `src/app/services/product.service.ts`
2. Replace the mock data with HTTP calls to your API endpoint
3. Update `apiUrl` in `src/environments/environment.ts` to point to your API
4. Ensure your API returns data in the `ProductsByCategory[]` format

Example API integration:
```typescript
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

constructor(private http: HttpClient) {}

getProductsByCategory(): Observable<ProductsByCategory[]> {
  return this.http.get<ProductsByCategory[]>(`${environment.apiUrl}/products/by-category`);
}
```

## Project Structure

```
src/app/
├── components/
│   ├── login/              # Login component with Microsoft sign-in
│   └── signage-display/    # Main digital signage display
├── guards/
│   └── msal.guard.ts       # Route guard for authentication
├── models/
│   ├── auth-config.model.ts    # MSAL configuration
│   ├── product.model.ts        # Product and Category interfaces
│   └── user-config.model.ts    # User configuration interface
├── services/
│   ├── product.service.ts      # Product data service
│   └── user-config.service.ts  # Configuration management service
└── environments/
    ├── environment.ts          # Development environment config
    └── environment.prod.ts     # Production environment config
```

## Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:

```bash
npm test
```

## How It Works

1. **Authentication**: Users are redirected to Microsoft login page (when not in demo mode)
2. **Token Management**: MSAL handles token acquisition and refresh automatically
3. **Configuration Loading**: User config is loaded from localStorage on app initialization
4. **Theme Application**: CSS variables are updated based on user configuration
5. **Product Loading**: Products are fetched and grouped by category
6. **Auto-Scroll**: Content automatically scrolls at configurable speed
7. **Loop Behavior**: When reaching the end, it pauses briefly and restarts from the top

## Deployment

### Environment Variables

Set the following environment variables for production:

- `AZURE_CLIENT_ID`: Your Azure AD Application (client) ID
- `AZURE_TENANT_ID`: Your Azure AD Directory (tenant) ID

### Build Configuration

The application automatically detects the environment and adjusts:
- Redirect URIs use `window.location.origin` in production
- Demo mode is disabled in production builds
- API URLs are configured per environment

## Troubleshooting

### MSAL Authentication Issues

1. Verify your Azure AD app registration includes the correct redirect URI
2. Check that `demoMode` is set to `false` in your environment config
3. Ensure the client ID and tenant ID are correct
4. Check browser console for detailed MSAL error messages

### Products Not Loading

1. Check browser console for API errors
2. Verify the `ProductService` is returning data correctly
3. Ensure mock data is properly formatted if not using a real API

### Auto-Scroll Not Working

1. Verify the scroll container has content taller than the viewport
2. Check that `scrollSpeed` in user config is greater than 0
3. Look for console errors related to the scroll functionality

## License

This project is private and proprietary.
