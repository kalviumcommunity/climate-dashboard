import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/lib/responseHandler";
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

// Mock data store (shared with main orders route)
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

// GET /api/orders/[id] - Get a specific order by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid order ID", { received: params.id });
    }

    const order = orders.find(o => o.id === id);
    
    if (!order) {
      return sendNotFoundError("Order", { orderId: id });
    }

    return sendSuccess(order, "Order fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch order", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}

// PUT /api/orders/[id] - Update an order completely
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid order ID", { received: params.id });
    }

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

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: pending, processing, shipped, delivered, or cancelled", {
        validStatuses: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        received: body.status
      });
    }

    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return sendNotFoundError("Order", { orderId: id });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      userId: Number(body.userId),
      totalAmount: Number(body.totalAmount),
      status: body.status,
      items: body.items,
      deliveredDate: body.status === 'delivered' ? new Date() : orders[orderIndex].deliveredDate,
    };

    return sendSuccess(orders[orderIndex], "Order updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// PATCH /api/orders/[id] - Partially update an order
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid order ID", { received: params.id });
    }

    const body = await req.json();
    
    if (body.status && !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(body.status)) {
      return sendValidationError("Invalid status. Must be: pending, processing, shipped, delivered, or cancelled", {
        validStatuses: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        received: body.status
      });
    }

    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return sendNotFoundError("Order", { orderId: id });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      userId: body.userId ? Number(body.userId) : orders[orderIndex].userId,
      totalAmount: body.totalAmount ? Number(body.totalAmount) : orders[orderIndex].totalAmount,
      deliveredDate: body.status === 'delivered' ? new Date() : orders[orderIndex].deliveredDate,
    };

    return sendSuccess(orders[orderIndex], "Order updated successfully");
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}

// DELETE /api/orders/[id] - Delete an order
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return sendValidationError("Invalid order ID", { received: params.id });
    }

    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return sendNotFoundError("Order", { orderId: id });
    }

    const deletedOrder = orders[orderIndex];
    orders.splice(orderIndex, 1);

    return sendSuccess(deletedOrder, "Order deleted successfully");
  } catch (error) {
    return sendError("Failed to delete order", ERROR_CODES.ORDER_DELETE_FAILED, 500, error);
  }
}
