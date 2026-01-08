import React from 'react';
import { useUiPathAuth } from '@/contexts/UiPathAuthContext';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';
export function AppHeader() {
  const { isAuthenticated, isInitializing, error } = useUiPathAuth();
  const getConnectionStatus = () => {
    if (isInitializing) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Activity className="h-3 w-3 mr-1 animate-spin" />
          Connecting
        </Badge>
      );
    }
    if (error) {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Connection Error
        </Badge>
      );
    }
    if (isAuthenticated) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        <AlertCircle className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    );
  };
  return (
    <header className="h-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">UiPath Command Center</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getConnectionStatus()}
          </div>
        </div>
      </div>
    </header>
  );
}