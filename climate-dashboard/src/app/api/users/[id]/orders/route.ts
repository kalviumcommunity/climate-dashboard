import { NextResponse } from 'next/server';

// Order interface
interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: string[];
  orderDate: Date;
  deliveredDate?: Date;
}

// Mock data store
let orders: Order[] = [
  { 
    id: 1, 
    userId: 1, 
    orderNumber: 'ORD-001', 
    totalAmount: 299.99, 
    status: 'delivered',
    items: ['Climate Sensor Pro', 'Weather Station Kit'],
    orderDate: new Date('2024-01-05'),
    deliveredDate: new Date('2024-01-08')
  },
  { 
    id: 2, 
    userId: 1, 
    orderNumber: 'ORD-002', 
    totalAmount: 149.99, 
    status: 'shipped',
    items: ['Temperature Monitor'],
    orderDate: new Date('2024-01-10')
  },
  { 
    id: 3, 
    userId: 2, 
    orderNumber: 'ORD-003', 
    totalAmount: 449.99, 
    status: 'processing',
    items: ['Complete Weather System', 'Installation Service'],
    orderDate: new Date('2024-01-12')
  },
];

// GET /api/users/[id]/orders - Get all orders for a specific user
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');

    let userOrders = orders.filter(order => order.userId === userId);

    // Apply status filter if provided
    if (status) {
      userOrders = userOrders.filter(order => order.status === status);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = userOrders.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total: userOrders.length,
        totalPages: Math.ceil(userOrders.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users/[id]/orders - Create a new order for a specific user
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!body.totalAmount || body.totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Valid totalAmount is required' },
        { status: 400 }
      );
    }

    const newOrder: Order = {
      id: Math.max(...orders.map(o => o.id)) + 1,
      userId,
      orderNumber: `ORD-${String(Math.max(...orders.map(o => parseInt(o.orderNumber.split('-')[1]))) + 1).padStart(3, '0')}`,
      totalAmount: Number(body.totalAmount),
      status: 'pending',
      items: body.items,
      orderDate: new Date(),
    };

    orders.push(newOrder);

    return NextResponse.json(
      { message: 'Order created successfully', data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
