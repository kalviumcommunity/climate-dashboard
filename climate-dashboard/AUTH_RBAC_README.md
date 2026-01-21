# Climate Dashboard - Authorization & RBAC System

This document describes the Role-Based Access Control (RBAC) system implemented for the Climate Dashboard API using JWT tokens and Next.js middleware.

## 🏗️ Architecture Overview

### Authentication Flow

```
┌─────────────┐    POST /api/auth/login    ┌──────────────┐    Generate JWT    ┌─────────────┐
│   Client    │ ────────────────────────> │   Auth API   │ ─────────────────> │   JWT Token │
│             │                           │              │                   │             │
└─────────────┘ <─────────────────────── └──────────────┘ <───────────────── └─────────────┘
      │                                        │
      │         Return JWT Token & User Data        │
      └────────────────────────────────────────────┘
```

### Middleware Authorization Flow

```
┌─────────────┐    Request with JWT     ┌──────────────┐    Verify Token    ┌─────────────┐
│   Client    │ ──────────────────────> │  Middleware   │ ───────────────> │   JWT       │
│             │                        │              │                  │  Verify     │
└─────────────┘ <───────────────────── └──────────────┘ <─────────────── └─────────────┘
      │                                        │
      │         Check User Role & Permissions      │
      └────────────────────────────────────────────┘
```

## 🔐 Authentication System

### JWT Token Structure
```json
{
  "userId": "user-1",
  "username": "admin",
  "email": "admin@climatedashboard.com",
  "role": "admin",
  "iat": 1642694400,
  "exp": 1642780800
}
```

### User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `admin` | System administrator | Full access to all endpoints including `/api/admin/*` |
| `operator` | Climate station operator | Access to `/api/users`, `/api/stations`, `/api/readings`, `/api/alerts` |

## 🛡️ Protected Routes

### Route Permissions Matrix

| Route | Admin | Operator | Description |
|-------|--------|-----------|-------------|
| `/api/auth/login` | ✅ Public | ✅ Public | Authentication endpoint |
| `/api/admin/*` | ✅ Allowed | ❌ Denied | Admin-only endpoints |
| `/api/users/*` | ✅ Allowed | ✅ Allowed | User management |
| `/api/stations/*` | ✅ Allowed | ✅ Allowed | Weather station CRUD |
| `/api/readings/*` | ✅ Allowed | ✅ Allowed | Sensor data management |
| `/api/alerts/*` | ✅ Allowed | ✅ Allowed | Alert management |
| `/api/protected` | ✅ Allowed | ✅ Allowed | Test endpoint |

## 📡 API Endpoints

### Authentication

#### POST /api/auth/login
Login with username and password to receive JWT token.

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-1",
      "username": "admin",
      "email": "admin@climatedashboard.com",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  },
  "message": "Login successful"
}
```

### Admin Endpoints (Admin Only)

#### GET /api/admin
Get system overview and statistics.

**Request:**
```bash
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer <ADMIN_JWT>"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "users": 3,
      "stations": 5,
      "readings": 8,
      "alerts": 4
    },
    "recentActivity": {
      "latestReadings": [...],
      "latestAlerts": [...]
    }
  },
  "message": "Admin data retrieved successfully"
}
```

### Protected Endpoints (Authenticated Users)

#### GET /api/users
Get list of users (requires authentication).

**Request:**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <USER_JWT>"
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  },
  "message": "Users retrieved successfully"
}
```

## 🚫 Access Denied Examples

### Missing Token
```bash
curl -X GET http://localhost:3000/api/admin
```
**Response (401):**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Insufficient Role (Operator accessing Admin)
```bash
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer <OPERATOR_JWT>"
```
**Response (403):**
```json
{
  "success": false,
  "message": "Access denied"
}
```

### Invalid Token
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer invalid_token"
```
**Response (401):**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

## 🔧 Implementation Details

### Middleware Configuration

The middleware (`src/middleware.ts`) handles:

1. **Token Extraction**: From `Authorization: Bearer <token>` header
2. **Token Verification**: Using JWT secret key
3. **Role Validation**: Checking user permissions against route requirements
4. **Request Headers**: Adding user info to request headers for downstream use

### Security Features

- **JWT Expiration**: 24-hour token expiry
- **Password Hashing**: bcrypt with salt rounds (12)
- **Role-Based Access**: Strict permission checking
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses without information leakage

## 🧪 Testing Credentials

### Test Users
| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | `admin` |
| `operator1` | `admin123` | `operator` |
| `operator2` | `admin123` | `operator` |

## 📋 Test Scenarios

### 1. Admin Access (Allowed)
```bash
# Login as admin
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | \
  jq -r '.data.token')

# Access admin endpoint
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### 2. Operator Access (Allowed)
```bash
# Login as operator
OPERATOR_TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"operator1","password":"admin123"}' | \
  jq -r '.data.token')

# Access users endpoint
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $OPERATOR_TOKEN"
```

### 3. Admin Access (Denied for Regular User)
```bash
# Try to access admin endpoint with operator token
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer $OPERATOR_TOKEN"
# Expected: 403 Access Denied
```

## 🔄 Extending the System

### Adding New Roles

1. **Update User Type** (`src/types/index.ts`):
```typescript
export interface User {
  // ... existing fields
  role: 'admin' | 'operator' | 'editor' | 'moderator'; // Add new roles
}
```

2. **Update Middleware** (`src/middleware.ts`):
```typescript
const routePermissions: Record<string, RouteConfig> = {
  '/api/admin': {
    roles: ['admin', 'moderator'], // Add new role to existing routes
    requireAuth: true,
  },
  '/api/content': {
    roles: ['admin', 'editor', 'moderator'], // New route with specific roles
    requireAuth: true,
  },
};
```

3. **Update Mock Data** (`src/data/mockData.ts`):
```typescript
export const mockUsers: User[] = [
  // ... existing users
  {
    id: "user-4",
    username: "editor1",
    email: "editor1@climatedashboard.com",
    password: "$2a$12$...", // hashed password
    role: "editor",
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
];
```

### Adding New Protected Routes

Simply add the route configuration to `routePermissions` in middleware:

```typescript
'/api/new-endpoint': {
  roles: ['admin', 'operator'], // Specify allowed roles
  requireAuth: true,
},
```

## 🛡️ Security Best Practices

### Least Privilege Principle

The system implements the **principle of least privilege** by:

1. **Default Deny**: All routes require explicit permission configuration
2. **Role Separation**: Clear distinction between admin and operator capabilities
3. **Minimal Access**: Each role only gets access to necessary endpoints
4. **Granular Control**: Route-specific role requirements

### Security Risks if Middleware Fails

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing JWT validation | Unauthorized access | Middleware enforces validation on all protected routes |
| Incorrect role checking | Privilege escalation | Strict role matching against allowed roles list |
| Token leakage | Session hijacking | Use HTTPS, short token expiry, secure headers |
| Weak passwords | Brute force attacks | bcrypt hashing, password complexity requirements |

## 📊 Monitoring & Logging

The middleware provides detailed logging:

```
🔍 Middleware: Processing /api/admin
✅ Token verified for user: admin (admin)
✅ Access granted for admin on: /api/admin
```

This helps with:
- Security auditing
- Access pattern analysis
- Debugging authentication issues
- Compliance monitoring

## 🚀 Getting Started

1. **Install Dependencies**:
```bash
npm install jose bcryptjs
```

2. **Set Environment Variables**:
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

3. **Start Development Server**:
```bash
npm run dev
```

4. **Test Authentication**:
```bash
# Login and get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📝 Summary

This RBAC system provides:

✅ **Secure Authentication**: JWT-based with password hashing  
✅ **Role-Based Access**: Admin and operator roles with different permissions  
✅ **Middleware Protection**: Automatic request interception and validation  
✅ **Comprehensive Logging**: Detailed access logs for monitoring  
✅ **Extensible Design**: Easy to add new roles and routes  
✅ **Security Best Practices**: Least privilege principle implementation  

The system ensures that users can only access the resources appropriate for their role, maintaining security while providing necessary functionality for the Climate Dashboard application.
