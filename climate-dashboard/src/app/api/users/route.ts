import { NextResponse } from 'next/server';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Mock data store
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date('2024-01-01') },
  { id: 2, name: 'Bob', email: 'bob@example.com', createdAt: new Date('2024-01-02') },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', createdAt: new Date('2024-01-03') },
];

let nextId = 4;

// GET /api/users - Get all users with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = users.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: users.length,
        totalPages: Math.ceil(users.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser = {
      id: nextId++,
      name: body.name,
      email: body.email,
      createdAt: new Date(),
    };

    users.push(newUser);

    return NextResponse.json(
      { message: 'User created successfully', data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
