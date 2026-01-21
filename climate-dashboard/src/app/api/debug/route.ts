import { NextRequest } from "next/server";
import { sendSuccess, sendError } from "@/utils/responseHandler";
import { mockUsers } from "@/data/mockData";

export async function GET() {
  try {
    const adminUser = mockUsers.find(u => u.username === 'admin');
    
    if (!adminUser) {
      return sendError("Admin user not found");
    }

    return sendSuccess({
      user: {
        username: adminUser.username,
        role: adminUser.role,
        email: adminUser.email,
      },
      passwordHash: adminUser.password,
      message: "Debug info - check if password hash matches expected format"
    }, "Debug data retrieved");
  } catch (error) {
    return sendError("Debug failed");
  }
}
