# NqApplication - Digital Signage App

An Angular application with MSAL OAuth authentication that displays products in a digital signage format.

## Features

- **MSAL Authentication**: Secure authentication using Microsoft Azure Active Directory
- **User Configuration**: Customizable look and feel loaded from storage/database
- **Product Display**: Products organized by category and displayed in an auto-scrolling layout
- **Digital Signage**: Continuous auto-scroll that loops back to the beginning
- **Responsive Design**: Optimized for large display devices

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- An Azure AD application registration

## Azure AD Setup

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Enter a name (e.g., "NQ Signage App")
5. Select "Accounts in this organizational directory only"
6. Add redirect URI: `http://localhost:4200` (type: Single-page application)
7. Click "Register"
8. Copy the **Application (client) ID** and **Directory (tenant) ID**
9. Update the configuration in `src/app/models/auth-config.model.ts`:
   - Replace `YOUR_CLIENT_ID_HERE` with your Application (client) ID
   - Replace `YOUR_TENANT_ID_HERE` with your Directory (tenant) ID

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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

### Product Data

Products are currently loaded from mock data in `ProductService`. To connect to a real API:

1. Update the `getProductsByCategory()` method in `src/app/services/product.service.ts`
2. Replace the mock data with HTTP calls to your API endpoint
3. Ensure your API returns data in the `ProductsByCategory[]` format

## Project Structure

```
src/app/
├── components/
│   ├── login/              # Login component
│   └── signage-display/    # Main digital signage display
├── guards/
│   └── msal.guard.ts       # Route guard for authentication
├── models/
│   ├── auth-config.model.ts    # MSAL configuration
│   ├── product.model.ts        # Product and Category interfaces
│   └── user-config.model.ts    # User configuration interface
└── services/
    ├── product.service.ts      # Product data service
    └── user-config.service.ts  # Configuration management service
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

1. **Authentication**: Users are redirected to Microsoft login page
2. **Token Management**: MSAL handles token acquisition and refresh automatically
3. **Product Loading**: Products are fetched and grouped by category
4. **Auto-Scroll**: Content automatically scrolls at configurable speed
5. **Loop Behavior**: When reaching the end, it pauses and restarts from the top

## License

This project is private and proprietary.
