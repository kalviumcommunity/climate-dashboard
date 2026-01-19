import { NextResponse } from 'next/server';

// Project interface
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}

// Mock data store
let projects: Project[] = [
  { 
    id: 1, 
    name: 'Climate Dashboard', 
    description: 'Real-time climate monitoring dashboard', 
    status: 'in_progress', 
    userId: 1, 
    createdAt: new Date('2024-01-01') 
  },
  { 
    id: 2, 
    name: 'Weather API Integration', 
    description: 'Integrate third-party weather APIs', 
    status: 'planning', 
    userId: 2, 
    createdAt: new Date('2024-01-02') 
  },
  { 
    id: 3, 
    name: 'Data Visualization Module', 
    description: 'Create interactive charts and graphs', 
    status: 'completed', 
    userId: 1, 
    createdAt: new Date('2024-01-03') 
  },
];

let nextId = 4;

// GET /api/projects - Get all projects with pagination and filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    let filteredProjects = projects;

    // Apply filters
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status);
    }
    if (userId) {
      filteredProjects = filteredProjects.filter(p => p.userId === Number(userId));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedProjects,
      pagination: {
        page,
        limit,
        total: filteredProjects.length,
        totalPages: Math.ceil(filteredProjects.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.name || !body.description || !body.userId) {
      return NextResponse.json(
        { error: 'Name, description, and userId are required' },
        { status: 400 }
      );
    }

    if (!['planning', 'in_progress', 'completed', 'on_hold'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: planning, in_progress, completed, or on_hold' },
        { status: 400 }
      );
    }

    const newProject: Project = {
      id: nextId++,
      name: body.name,
      description: body.description,
      status: body.status || 'planning',
      userId: Number(body.userId),
      createdAt: new Date(),
    };

    projects.push(newProject);

    return NextResponse.json(
      { message: 'Project created successfully', data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
