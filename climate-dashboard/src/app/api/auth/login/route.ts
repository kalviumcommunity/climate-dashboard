import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: 'Email is required' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const token = signToken({ userId: user.id });

  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
  });

  return res;
}
