import React from 'react';
import { useUiPathAuth } from '@/contexts/UiPathAuthContext';
import { useUiPathProcesses, useStartProcess } from '@/hooks/useUiPathProcesses';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Play, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
export function ProcessTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: processes, isLoading, error } = useUiPathProcesses(undefined, isAuthenticated);
  const { mutate: startProcess, isPending } = useStartProcess();
  const handleStartProcess = (processKey: string, processName: string) => {
    startProcess(
      { processKey, folderId: 1 },
      {
        onSuccess: () => {
          toast.success(`Process "${processName}" started successfully`);
        },
        onError: (error) => {
          toast.error(`Failed to start process: ${error.message}`);
        },
      }
    );
  };
  if (isLoading) {
    return (
      <div className="border border-border rounded-lg">
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <p>Failed to load processes</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }
  const processArray = Array.isArray(processes) ? processes : processes?.value || [];
  if (processArray.length === 0) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <p>No processes found</p>
          <p className="text-sm mt-1">Create processes in UiPath Orchestrator to see them here</p>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Version</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processArray.map((process) => (
            <TableRow key={process.id} className="hover:bg-muted/50">
              <TableCell className="py-2 px-3">
                <div>
                  <div className="font-medium text-foreground">{process.name}</div>
                  {process.description && (
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {process.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-2 px-3">
                <span className="text-sm text-muted-foreground">{process.processVersion}</span>
              </TableCell>
              <TableCell className="py-2 px-3">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available
                </Badge>
              </TableCell>
              <TableCell className="py-2 px-3">
                <Button
                  size="sm"
                  onClick={() => handleStartProcess(process.processKey, process.name)}
                  disabled={isPending}
                  className="h-8 w-8 p-0"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}