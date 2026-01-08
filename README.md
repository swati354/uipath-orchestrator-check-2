# UiPath Orchestrator Command Center

A comprehensive enterprise dashboard application that provides UiPath automation teams with centralized visibility and control over their Orchestrator environment. Built with React, TypeScript, and the official UiPath SDK.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-orchestrator-check-2)

## Overview

The UiPath Orchestrator Command Center is a modern web application that unifies process management, asset configuration, and Action Center task handling in a single, professional interface. It emphasizes information density and streamlined workflows to help automation teams quickly assess system status and take necessary actions.

## Key Features

- **Process Management** - View all published automation processes with their status, versions, and execution capabilities. Start processes directly from the interface.
- **Asset Management** - Display all configuration assets with their values and security settings in a clean tabular format with proper handling of masked credential values.
- **Action Center Tasks** - Dedicated workspace for viewing, assigning, and completing human-in-the-loop tasks with proper form handling and status tracking.
- **Real-time Updates** - Automatic data refresh and caching with React Query for optimal performance.
- **Professional UI** - Clean, enterprise-grade interface built with shadcn/ui components and Tailwind CSS.

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI primitives, Tailwind CSS
- **UiPath Integration**: Official UiPath TypeScript SDK with OAuth authentication
- **Data Management**: TanStack React Query for caching and synchronization
- **State Management**: Zustand for client-side state
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Cloudflare Pages

## Prerequisites

- [Bun](https://bun.sh/) runtime
- UiPath Orchestrator instance with OAuth External App configured
- Modern web browser with JavaScript enabled

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uipath-orchestrator-command-center
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables by creating a `.env` file:
```env
VITE_UIPATH_BASE_URL=https://your-orchestrator-instance.com
VITE_UIPATH_ORG_NAME=your-organization-name
VITE_UIPATH_TENANT_NAME=your-tenant-name
VITE_UIPATH_CLIENT_ID=your-oauth-client-id
VITE_UIPATH_REDIRECT_URI=
VITE_UIPATH_SCOPE=
```

## UiPath OAuth Setup

1. In UiPath Orchestrator, navigate to **Admin** > **External Applications**
2. Create a new External Application with:
   - **Application Type**: Confidential Application
   - **Redirect URIs**: Your application URL (e.g., `http://localhost:3000` for development)
   - **Scopes**: `OR.Execution`, `OR.Assets`, `OR.Tasks` (minimum required)
3. Copy the **Client ID** to your `.env` file as `VITE_UIPATH_CLIENT_ID`

## Development

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint

## Usage

### Authentication

The application uses OAuth 2.0 authentication with UiPath Orchestrator. On first visit, you'll be redirected to authenticate with your UiPath credentials. The authentication state is managed automatically.

### Processes & Assets Tab

- View all published processes with their current status and versions
- Start processes directly by clicking the "Start" button
- Browse configuration assets with their current values
- Credential assets are automatically masked for security

### Action Center Tasks Tab

- View all pending and assigned tasks
- Assign tasks to users
- Complete tasks with appropriate form data
- Track task status and priority levels

### Data Refresh

The application automatically refreshes data:
- Processes and Assets: Every 5 minutes
- Tasks: Every 2 minutes
- Manual refresh available through browser reload

## Architecture

The application follows a clean architecture pattern:

- **Components**: Reusable UI components built with shadcn/ui
- **Hooks**: Custom React Query hooks for UiPath API integration
- **Contexts**: Authentication state management
- **Pages**: Main application views and routing

### Key Design Decisions

- **No Mock Data**: All data comes from real UiPath SDK calls
- **Authentication-First**: All API calls are gated by authentication state
- **Optimistic Updates**: UI updates immediately with server synchronization
- **Error Boundaries**: Comprehensive error handling and user feedback

## Deployment

### Cloudflare Pages

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-orchestrator-check-2)

1. Build the application:
```bash
bun run build
```

2. Deploy to Cloudflare Pages:
   - Connect your repository to Cloudflare Pages
   - Set build command: `bun run build`
   - Set build output directory: `dist`
   - Add environment variables in Cloudflare dashboard

3. Configure environment variables in Cloudflare Pages dashboard with your UiPath OAuth credentials.

### Manual Deployment

The build creates static files in the `dist/` directory that can be deployed to any static hosting service:

```bash
bun run build
# Deploy contents of dist/ directory
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_UIPATH_BASE_URL` | UiPath Orchestrator instance URL | Yes |
| `VITE_UIPATH_ORG_NAME` | Organization name | Yes |
| `VITE_UIPATH_TENANT_NAME` | Tenant name | Yes |
| `VITE_UIPATH_CLIENT_ID` | OAuth client ID from External App | Yes |
| `VITE_UIPATH_REDIRECT_URI` | OAuth redirect URI (optional) | No |
| `VITE_UIPATH_SCOPE` | OAuth scopes (optional) | No |

### Folder Scoping

Most UiPath operations support folder-based filtering. The application currently operates across all accessible folders, but can be configured to scope to specific folders by modifying the hook parameters.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Submit a pull request with a clear description

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing component patterns
- Add proper error handling for all UiPath API calls
- Test with real UiPath data, never mock data
- Maintain responsive design principles

## Security

- OAuth tokens are handled securely by the UiPath SDK
- Credential asset values are automatically masked
- No sensitive data is stored in localStorage
- All API calls are made over HTTPS

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues and questions:
- Check the UiPath SDK documentation
- Review the troubleshooting section in the code comments
- Ensure OAuth configuration is correct
- Verify network connectivity to UiPath Orchestrator