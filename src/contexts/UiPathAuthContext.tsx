import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeUiPathSDK, getUiPath } from '@/lib/uipath';
import type { UiPath } from 'uipath-sdk';
interface UiPathAuthContextType {
  isInitializing: boolean;
  isAuthenticated: boolean;
  error: string | null;
  uipath: UiPath | null;
}
const UiPathAuthContext = createContext<UiPathAuthContextType | undefined>(undefined);
export function UiPathAuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uipath, setUipath] = useState<UiPath | null>(null);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔄 UiPath Auth: Starting initialization...');
        setIsInitializing(true);
        setError(null);
        const uipathInstance = await initializeUiPathSDK();
        setUipath(uipathInstance);
        const authenticated = uipathInstance.isAuthenticated();
        setIsAuthenticated(authenticated);
        console.log('✅ UiPath Auth: Initialization complete', { authenticated });
      } catch (err) {
        console.error('❌ UiPath Auth: Initialization failed', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize UiPath SDK';
        setError(errorMessage);
        setIsAuthenticated(false);
        setUipath(null);
      } finally {
        setIsInitializing(false);
      }
    };
    initializeAuth();
  }, []);
  const value: UiPathAuthContextType = {
    isInitializing,
    isAuthenticated,
    error,
    uipath,
  };
  return (
    <UiPathAuthContext.Provider value={value}>
      {children}
    </UiPathAuthContext.Provider>
  );
}
export function useUiPathAuth(): UiPathAuthContextType {
  const context = useContext(UiPathAuthContext);
  if (context === undefined) {
    throw new Error('useUiPathAuth must be used within a UiPathAuthProvider');
  }
  return context;
}