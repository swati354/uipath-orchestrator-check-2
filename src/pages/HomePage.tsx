import React from 'react';
import { UiPathAuthProvider } from '@/contexts/UiPathAuthContext';
import { AuthWrapper } from '@/components/AuthWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppHeader } from '@/components/layout/AppHeader';
import { ProcessesAssetsView } from '@/components/uipath/ProcessesAssetsView';
import { TasksView } from '@/components/uipath/TasksView';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <UiPathAuthProvider>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <AuthWrapper>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 md:py-10 lg:py-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">UiPath Orchestrator Command Center</h1>
                  <p className="text-muted-foreground">
                    Centralized management for automation processes, assets, and Action Center tasks
                  </p>
                </div>
                <Tabs defaultValue="processes-assets" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="processes-assets">Processes & Assets</TabsTrigger>
                    <TabsTrigger value="tasks">Action Center Tasks</TabsTrigger>
                  </TabsList>
                  <TabsContent value="processes-assets" className="space-y-6">
                    <ProcessesAssetsView />
                  </TabsContent>
                  <TabsContent value="tasks" className="space-y-6">
                    <TasksView />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </AuthWrapper>
        <Toaster />
      </div>
    </UiPathAuthProvider>
  );
}