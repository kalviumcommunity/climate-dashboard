import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

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
      return sendValidationError("Invalid project ID", { received: params.id });
    }

    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return sendNotFoundError("Project", { projectId: id });
    }

    return sendSuccess(project, "Project fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch project", ERROR_CODES.INTERNAL_ERROR, 500, error);
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
      return sendValidationError("Invalid project ID", { received: params.id });
    }

    const body = await req.json();
    
    if (!body.name || !body.description || !body.userId) {
      return sendValidationError("Name, description, and userId are required", {
        required: ['name', 'description', 'userId'],
        received: body
      });
    }

    if (!['planning', 'in_progress', 'completed', 'on_hold'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: planning, in_progress, completed, or on_hold", {
        validStatuses: ['planning', 'in_progress', 'completed', 'on_hold'],
        received: body.status
      });
    }

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return sendNotFoundError("Project", { projectId: id });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      name: body.name,
      description: body.description,
      status: body.status,
      userId: Number(body.userId),
      updatedAt: new Date(),
    };

    return sendSuccess(projects[projectIndex], "Project updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
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
      return sendValidationError("Invalid project ID", { received: params.id });
    }

    const body = await req.json();
    
    if (body.status && !['planning', 'in_progress', 'completed', 'on_hold'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: planning, in_progress, completed, or on_hold", {
        validStatuses: ['planning', 'in_progress', 'completed', 'on_hold'],
        received: body.status
      });
    }

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return sendNotFoundError("Project", { projectId: id });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      updatedAt: new Date(),
    };

    return sendSuccess(projects[projectIndex], "Project updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
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
      return sendValidationError("Invalid project ID", { received: params.id });
    }

    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return sendNotFoundError("Project", { projectId: id });
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);

    return sendSuccess(deletedProject, "Project deleted successfully");
  } catch (error) {
    return sendError("Failed to delete project", ERROR_CODES.PROJECT_DELETE_FAILED, 500, error);
  }
}
