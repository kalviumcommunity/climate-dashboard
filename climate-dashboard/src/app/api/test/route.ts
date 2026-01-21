import { NextRequest } from "next/server";
import { sendSuccess, sendError } from "@/utils/responseHandler";
import { mockUsers } from "@/data/mockData";
import { comparePassword } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const testUser = mockUsers.find(u => u.username === 'admin');
    
    if (!testUser) {
      return sendError("Admin user not found");
    }

    const isValid = await comparePassword('admin123', testUser.password);
    
    return sendSuccess({
      user: {
        username: testUser.username,
        role: testUser.role,
      },
      passwordValid: isValid,
      passwordHash: testUser.password.substring(0, 20) + '...',
    }, "Password test completed");
  } catch (error) {
    return sendError("Test failed");
  }
}
