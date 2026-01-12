import { NextResponse } from 'next/server';

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

// Mock data store
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

let nextId = 4;

// GET /api/tasks - Get all tasks with pagination and filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const projectId = searchParams.get('projectId');
    const assignedTo = searchParams.get('assignedTo');

    let filteredTasks = tasks;

    // Apply filters
    if (status) {
      filteredTasks = filteredTasks.filter(t => t.status === status);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter(t => t.priority === priority);
    }
    if (projectId) {
      filteredTasks = filteredTasks.filter(t => t.projectId === Number(projectId));
    }
    if (assignedTo) {
      filteredTasks = filteredTasks.filter(t => t.assignedTo === Number(assignedTo));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedTasks,
      pagination: {
        page,
        limit,
        total: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.title || !body.description || !body.projectId) {
      return NextResponse.json(
        { error: 'Title, description, and projectId are required' },
        { status: 400 }
      );
    }

    if (!['todo', 'in_progress', 'completed', 'blocked'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: todo, in_progress, completed, or blocked' },
        { status: 400 }
      );
    }

    if (!['low', 'medium', 'high', 'urgent'].includes(body.priority)) {
      return NextResponse.json(
        { error: 'Invalid priority. Must be: low, medium, high, or urgent' },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: nextId++,
      title: body.title,
      description: body.description,
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      projectId: Number(body.projectId),
      assignedTo: body.assignedTo ? Number(body.assignedTo) : undefined,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      createdAt: new Date(),
    };

    tasks.push(newTask);

    return NextResponse.json(
      { message: 'Task created successfully', data: newTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
