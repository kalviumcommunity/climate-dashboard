import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendError } from "@/utils/responseHandler";
import { mockUsers } from "@/data/mockData";
import { comparePassword, generateToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return sendValidationError("Missing required fields: username, password");
    }

    const user = mockUsers.find((u) => u.username === username);
    
    if (!user) {
      return sendValidationError("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return sendValidationError("Invalid credentials");
    }

    const token = await generateToken(user);
    
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return sendSuccess(
      {
        user: userResponse,
        token,
        expiresIn: '24h',
      },
      "Login successful"
    );
  } catch (error) {
    return sendError("Login failed");
  }
}
