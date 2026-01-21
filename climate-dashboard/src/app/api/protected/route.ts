import { NextRequest } from "next/server";
import { sendSuccess } from "@/utils/responseHandler";

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  const username = request.headers.get('x-user-username');

  return sendSuccess({
    message: "Authentication successful!",
    user: {
      id: userId,
      username,
      role: userRole,
    },
    timestamp: new Date().toISOString(),
  }, "Protected route accessed successfully");
}
