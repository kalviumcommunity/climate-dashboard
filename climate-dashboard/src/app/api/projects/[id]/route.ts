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

// Mock data store (shared with main projects route)
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

// GET /api/projects/[id] - Get a specific project by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: project });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a project completely
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

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

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      name: body.name,
      description: body.description,
      status: body.status,
      userId: Number(body.userId),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      message: 'Project updated successfully',
      data: projects[projectIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}

// PATCH /api/projects/[id] - Partially update a project
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    
    if (body.status && !['planning', 'in_progress', 'completed', 'on_hold'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: planning, in_progress, completed, or on_hold' },
        { status: 400 }
      );
    }

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      message: 'Project updated successfully',
      data: projects[projectIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);

    return NextResponse.json({
      message: 'Project deleted successfully',
      data: deletedProject,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
