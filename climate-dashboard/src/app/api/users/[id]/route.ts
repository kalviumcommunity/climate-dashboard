import { NextRequest } from "next/server";
import {
  sendSuccess,
  sendValidationError,
  sendNotFoundError,
  sendError,
} from "@/utils/responseHandler";
import { mockUsers } from "@/data/mockData";
import { User } from "@/types";

// GET /api/users/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = mockUsers.find((u) => u.id === params.id);

    if (!user) {
      return sendNotFoundError("User not found");
    }

    return sendSuccess(user, "User retrieved successfully");
  } catch (error) {
    return sendError("Failed to retrieve user");
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return sendNotFoundError("User not found");
    }

    const { username, email, role } = body;
    const existingUser = mockUsers[userIndex];

    // Username validation
    if (username) {
      const duplicateUser = mockUsers.find(
        (u) => u.username === username && u.id !== params.id
      );
      if (duplicateUser) {
        return sendValidationError("Username already exists");
      }
    }
    
    // Email validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendValidationError("Invalid email format");
      }

      const duplicateEmail = mockUsers.find(
        (u) => u.email === email && u.id !== params.id
      );
      if (duplicateEmail) {
        return sendValidationError("Email already exists");
      }
    }

    // Role validation (Climate Dashboard roles)
    if (role) {
      const validRoles = ["admin", "operator"];
      if (!validRoles.includes(role)) {
        return sendValidationError(
          Role must be one of: ${validRoles.join(", ")}
        );
      }
    }

    const updatedUser: User = {
      ...existingUser,
      username: username ?? existingUser.username,
      email: email ?? existingUser.email,
      role: role ?? existingUser.role,
      updatedAt: new Date(),
    };

    mockUsers[userIndex] = updatedUser;

    return sendSuccess(updatedUser, "User updated successfully");
  } catch (error) {
    return sendValidationError("Invalid request body");
  }
}


// DELETE /api/users/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return sendNotFoundError("User not found");
    }

    const deletedUser = mockUsers[userIndex];
    mockUsers.splice(userIndex, 1);

    return sendSuccess(deletedUser, "User deleted successfully");
  } catch (error) {
    return sendError("Failed to delete user");
  }
}
