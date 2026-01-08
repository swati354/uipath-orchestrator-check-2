import React from 'react';
import { ProcessTable } from './ProcessTable';
import { AssetTable } from './AssetTable';
export function ProcessesAssetsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-semibold text-foreground">Processes</h2>
            <p className="text-sm text-muted-foreground">
              Published automation processes available for execution
            </p>
          </div>
          <ProcessTable />
        </div>
        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-semibold text-foreground">Assets</h2>
            <p className="text-sm text-muted-foreground">
              Configuration assets and credentials
            </p>
          </div>
          <AssetTable />
        </div>
      </div>
    </div>
  );
}