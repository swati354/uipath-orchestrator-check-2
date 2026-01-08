import React from 'react';
import { TaskTable } from './TaskTable';
export function TasksView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-semibold text-foreground">Action Center Tasks</h2>
        <p className="text-muted-foreground">
          Human-in-the-loop tasks requiring review, approval, or completion
        </p>
      </div>
      <TaskTable />
    </div>
  );
}