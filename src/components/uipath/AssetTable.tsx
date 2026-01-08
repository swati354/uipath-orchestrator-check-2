import React from 'react';
import { useUiPathAuth } from '@/contexts/UiPathAuthContext';
import { useUiPathAssets } from '@/hooks/useUiPathAssets';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';
export function AssetTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: assets, isLoading, error } = useUiPathAssets(undefined, isAuthenticated);
  const getAssetTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'text':
        return 'bg-blue-100 text-blue-800';
      case 'integer':
        return 'bg-green-100 text-green-800';
      case 'boolean':
        return 'bg-purple-100 text-purple-800';
      case 'credential':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatAssetValue = (asset: any) => {
    if (asset.valueType === 'Credential') {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <EyeOff className="h-4 w-4" />
          <span>••••••••</span>
        </div>
      );
    }
    if (asset.value === null || asset.value === undefined) {
      return <span className="text-muted-foreground">-</span>;
    }
    return (
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground">{String(asset.value)}</span>
      </div>
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
          <p>Failed to load assets</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }
  const assetArray = Array.isArray(assets) ? assets : assets?.value || [];
  if (assetArray.length === 0) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <p>No assets found</p>
          <p className="text-sm mt-1">Create assets in UiPath Orchestrator to see them here</p>
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
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetArray.map((asset) => (
            <TableRow key={asset.id} className="hover:bg-muted/50">
              <TableCell className="py-2 px-3">
                <div className="font-medium text-foreground">{asset.name}</div>
              </TableCell>
              <TableCell className="py-2 px-3">
                <Badge variant="secondary" className={getAssetTypeColor(asset.valueType)}>
                  {asset.valueType}
                </Badge>
              </TableCell>
              <TableCell className="py-2 px-3">
                {formatAssetValue(asset)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}