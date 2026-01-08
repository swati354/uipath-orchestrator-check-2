import React from 'react';
import { useUiPathAuth } from '@/contexts/UiPathAuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
interface AuthWrapperProps {
  children: React.ReactNode;
}
export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isInitializing, isAuthenticated, error } = useUiPathAuth();
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Connecting to UiPath</h2>
            <p className="text-muted-foreground">Initializing authentication...</p>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="mt-2">
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please complete the OAuth authentication flow to access UiPath services.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Authenticate with UiPath
          </Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}