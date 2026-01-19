import { sendSuccess, sendValidationError, sendError } from "@/lib/responseHandler";
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
    
    return sendSuccess({
      data: paginatedProjects,
      pagination: {
        page,
        limit,
        total: filteredProjects.length,
        totalPages: Math.ceil(filteredProjects.length / limit),
      },
    }, "Projects fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch projects", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
  try {
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

    const newProject: Project = {
      id: nextId++,
      name: body.name,
      description: body.description,
      status: body.status || 'planning',
      userId: Number(body.userId),
      createdAt: new Date(),
    };

    projects.push(newProject);

    return sendSuccess(newProject, "Project created successfully", 201);
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}
