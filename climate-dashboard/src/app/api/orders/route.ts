import { sendSuccess, sendValidationError, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

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

let nextOrderNumber = 4;

// GET /api/orders - Get all orders with pagination and filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    let filteredOrders = orders;

    // Apply filters
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    if (userId) {
      filteredOrders = filteredOrders.filter(o => o.userId === Number(userId));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    return sendSuccess({
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit),
      },
    }, "Orders fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch orders", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}

// POST /api/orders - Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.userId || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return sendValidationError("UserId and items array are required", {
        required: ['userId', 'items'],
        received: body
      });
    }

    if (!body.totalAmount || body.totalAmount <= 0) {
      return sendValidationError("Valid totalAmount is required", {
        required: 'totalAmount',
        received: body.totalAmount,
        constraint: 'must be greater than 0'
      });
    }

    const newOrder: Order = {
      id: Math.max(...orders.map(o => o.id)) + 1,
      userId: Number(body.userId),
      orderNumber: `ORD-${String(nextOrderNumber++).padStart(3, '0')}`,
      totalAmount: Number(body.totalAmount),
      status: 'pending',
      items: body.items,
      orderDate: new Date(),
    };

    orders.push(newOrder);

    return sendSuccess(newOrder, "Order created successfully", 201);
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}
