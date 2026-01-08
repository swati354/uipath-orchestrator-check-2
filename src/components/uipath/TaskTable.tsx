import React, { useState } from 'react';
import { useUiPathAuth } from '@/contexts/UiPathAuthContext';
import { useUiPathTasks, useAssignTask, useCompleteTask } from '@/hooks/useUiPathTasks';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { TaskType } from 'uipath-sdk';
export function TaskTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: tasks, isLoading, error } = useUiPathTasks(undefined, isAuthenticated);
  const { mutate: assignTask, isPending: isAssigning } = useAssignTask();
  const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleAssignTask = () => {
    if (!selectedTaskId || !assigneeEmail.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    assignTask(
      { taskId: selectedTaskId, userNameOrEmail: assigneeEmail.trim() },
      {
        onSuccess: () => {
          toast.success('Task assigned successfully');
          setAssignDialogOpen(false);
          setAssigneeEmail('');
          setSelectedTaskId(null);
        },
        onError: (error) => {
          toast.error(`Failed to assign task: ${error.message}`);
        },
      }
    );
  };
  const handleCompleteTask = (taskId: number, taskType: string) => {
    // For demo purposes, we'll complete External tasks without data
    // In a real app, you'd have forms for different task types
    const type = taskType === 'External' ? TaskType.External : TaskType.App;
    if (type === TaskType.External) {
      completeTask(
        { taskId, type, folderId: 1 },
        {
          onSuccess: () => {
            toast.success('Task completed successfully');
          },
          onError: (error) => {
            toast.error(`Failed to complete task: ${error.message}`);
          },
        }
      );
    } else {
      // For App/Form tasks, we need data and action
      completeTask(
        { taskId, type, data: { completed: true }, action: 'submit', folderId: 1 },
        {
          onSuccess: () => {
            toast.success('Task completed successfully');
          },
          onError: (error) => {
            toast.error(`Failed to complete task: ${error.message}`);
          },
        }
      );
    }
  };
  const openAssignDialog = (taskId: number) => {
    setSelectedTaskId(taskId);
    setAssignDialogOpen(true);
  };
  if (isLoading) {
    return (
      <div className="border border-border rounded-lg">
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <p>Failed to load tasks</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }
  const taskArray = Array.isArray(tasks) ? tasks : tasks?.value || [];
  if (taskArray.length === 0) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <p>No tasks found</p>
          <p className="text-sm mt-1">Create tasks in UiPath Action Center to see them here</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Priority</TableHead>
              <TableHead className="font-medium">Assignee</TableHead>
              <TableHead className="font-medium">Due Date</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskArray.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/50">
                <TableCell className="py-3 px-3">
                  <div>
                    <div className="font-medium text-foreground">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {task.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-3">
                  <span className="text-sm text-muted-foreground">
                    {task.assignedToUser || 'Unassigned'}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    {task.status !== 'Completed' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAssignDialog(task.id)}
                          disabled={isAssigning}
                          className="h-8"
                        >
                          {isAssigning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserPlus className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleCompleteTask(task.id, task.type)}
                          disabled={isCompleting}
                          className="h-8"
                        >
                          {isCompleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignee-email">Assignee Email</Label>
              <Input
                id="assignee-email"
                type="email"
                placeholder="user@example.com"
                value={assigneeEmail}
                onChange={(e) => setAssigneeEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignTask} disabled={isAssigning}>
                {isAssigning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Assigning...
                  </>
                ) : (
                  'Assign Task'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}