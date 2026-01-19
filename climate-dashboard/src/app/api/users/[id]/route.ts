import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Mock data store (shared with main users route)
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date('2024-01-01') },
  { id: 2, name: 'Bob', email: 'bob@example.com', createdAt: new Date('2024-01-02') },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', createdAt: new Date('2024-01-03') },
];

// GET /api/users/[id] - Get a specific user by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid user ID", { received: params.id });
    }

    const user = users.find(u => u.id === id);
    
    if (!user) {
      return sendNotFoundError("User", { userId: id });
    }

    return sendSuccess(user, "User fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch user", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}

// PUT /api/users/[id] - Update a user completely
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid user ID", { received: params.id });
    }

    const body = await req.json();
    
    if (!body.name || !body.email) {
      return sendValidationError("Name and email are required", {
        required: ['name', 'email'],
        received: body
      });
    }

    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return sendNotFoundError("User", { userId: id });
    }

    users[userIndex] = {
      ...users[userIndex],
      name: body.name,
      email: body.email,
      updatedAt: new Date(),
    };

    return sendSuccess(users[userIndex], "User updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// PATCH /api/users/[id] - Partially update a user
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid user ID", { received: params.id });
    }

    const body = await req.json();
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return sendNotFoundError("User", { userId: id });
    }

    users[userIndex] = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date(),
    };

    return sendSuccess(users[userIndex], "User updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid user ID", { received: params.id });
    }

    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return sendNotFoundError("User", { userId: id });
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);

    return sendSuccess(deletedUser, "User deleted successfully");
  } catch (error) {
    return sendError("Failed to delete user", ERROR_CODES.USER_DELETE_FAILED, 500, error);
  }
}
