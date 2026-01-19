import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

// Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: number;
  assignedTo?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

// Mock data store (shared with main tasks route)
let tasks: Task[] = [
  { 
    id: 1, 
    title: 'Setup project structure', 
    description: 'Initialize Next.js project with TypeScript', 
    status: 'completed', 
    priority: 'high',
    projectId: 1, 
    assignedTo: 1,
    dueDate: new Date('2024-01-10'),
    createdAt: new Date('2024-01-01') 
  },
  { 
    id: 2, 
    title: 'Design API endpoints', 
    description: 'Create RESTful API structure', 
    status: 'in_progress', 
    priority: 'high',
    projectId: 1, 
    assignedTo: 1,
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-02') 
  },
  { 
    id: 3, 
    title: 'Research weather APIs', 
    description: 'Evaluate third-party weather service providers', 
    status: 'todo', 
    priority: 'medium',
    projectId: 2, 
    assignedTo: 2,
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-03') 
  },
];

// GET /api/tasks/[id] - Get a specific task by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid task ID", { received: params.id });
    }

    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return sendNotFoundError("Task", { taskId: id });
    }

    return sendSuccess(task, "Task fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch task", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}

// PUT /api/tasks/[id] - Update a task completely
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid task ID", { received: params.id });
    }

    const body = await req.json();
    
    if (!body.title || !body.description || !body.projectId) {
      return sendValidationError("Title, description, and projectId are required", {
        required: ['title', 'description', 'projectId'],
        received: body
      });
    }

    if (!['todo', 'in_progress', 'completed', 'blocked'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: todo, in_progress, completed, or blocked", {
        validStatuses: ['todo', 'in_progress', 'completed', 'blocked'],
        received: body.status
      });
    }

    if (!['low', 'medium', 'high', 'urgent'].includes(body.priority)) {
      return sendValidationError("Invalid priority. Must be: low, medium, high, or urgent", {
        validPriorities: ['low', 'medium', 'high', 'urgent'],
        received: body.priority
      });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return sendNotFoundError("Task", { taskId: id });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      projectId: Number(body.projectId),
      assignedTo: body.assignedTo ? Number(body.assignedTo) : undefined,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      updatedAt: new Date(),
    };

    return sendSuccess(tasks[taskIndex], "Task updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// PATCH /api/tasks/[id] - Partially update a task
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid task ID", { received: params.id });
    }

    const body = await req.json();
    
    if (body.status && !['todo', 'in_progress', 'completed', 'blocked'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: todo, in_progress, completed, or blocked", {
        validStatuses: ['todo', 'in_progress', 'completed', 'blocked'],
        received: body.status
      });
    }

    if (body.priority && !['low', 'medium', 'high', 'urgent'].includes(body.priority)) {
      return sendValidationError("Invalid priority. Must be: low, medium, high, or urgent", {
        validPriorities: ['low', 'medium', 'high', 'urgent'],
        received: body.priority
      });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return sendNotFoundError("Task", { taskId: id });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...body,
      projectId: body.projectId ? Number(body.projectId) : tasks[taskIndex].projectId,
      assignedTo: body.assignedTo ? Number(body.assignedTo) : tasks[taskIndex].assignedTo,
      dueDate: body.dueDate ? new Date(body.dueDate) : tasks[taskIndex].dueDate,
      updatedAt: new Date(),
    };

    return sendSuccess(tasks[taskIndex], "Task updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid task ID", { received: params.id });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return sendNotFoundError("Task", { taskId: id });
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);

    return sendSuccess(deletedTask, "Task deleted successfully");
  } catch (error) {
    return sendError("Failed to delete task", ERROR_CODES.TASK_DELETE_FAILED, 500, error);
  }
}
