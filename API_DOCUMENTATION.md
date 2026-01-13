# API Endpoints Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require authentication via JWT token stored in cookies.

---

## 1. Root Endpoint

### GET /
**Description:** Basic health check endpoint  
**Authentication:** None required

**Response:**
```json
"Hello this is from my backend"
```

---

## 2. Authentication Endpoints

### POST /auth/signup
**Description:** Register a new user  
**Authentication:** None required

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "type": "string (vendor/customer)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User Signed Up",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "type": "vendor"
  }
}
```

### POST /auth/login
**Description:** Login user and get JWT token  
**Authentication:** None required

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User logged in",
  "data": "jwt_token_string"
}
```

---

## 3. Product Endpoints (Vendor Only)

### POST /vendor/products
**Description:** Create a new product  
**Authentication:** Required (JWT token in cookies)

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "price": "number (required)",
  "categories": "array of strings (optional)",
  "image": "string (optional)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 999.99,
    "categories": ["electronics", "smartphones"],
    "image": "https://example.com/iphone15.jpg",
    "vendorId": 1
  }
}
```

### GET /vendor/products
**Description:** Get all products for the authenticated vendor with pagination  
**Authentication:** Required (JWT token in cookies)

**Query Parameters:**
- `page` (optional): Page number (default: 1, minimum: 1)
- `limit` (optional): Number of items per page (default: 10, maximum: 100)

**Example Requests:**
```
GET /vendor/products?page=1&limit=5
GET /vendor/products?page=2&limit=20
GET /vendor/products (uses defaults: page=1, limit=10)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "categories": ["electronics"],
      "image": "https://example.com/image.jpg",
      "vendorsId": "uuid",
      "createdAt": "2024-01-13T10:00:00.000Z",
      "updatedAt": "2024-01-13T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Pagination Details:**
- Products are ordered by creation date (newest first)
- Maximum limit is 100 items per page
- Page numbering starts from 1
- Invalid pagination parameters return 400 error

### PUT /vendor/products/:id
**Description:** Update a product by ID  
**Authentication:** Required (JWT token in cookies)

**Request Body:** (at least one field required)
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "price": "number (optional)",
  "categories": "array of strings (optional)",
  "image": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Product Name",
    "price": 899.99
  }
}
```

### DELETE /vendor/products/:id
**Description:** Delete a product by ID  
**Authentication:** Required (JWT token in cookies)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Error Responses

**Common Error Format:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 404: Not Found
- 500: Internal Server Error

---

## Testing Flow

1. **Signup/Login** to get authenticated
2. **Create products** using POST /vendor/products
3. **View products** using GET /vendor/products
4. **Update products** using PUT /vendor/products/:id
5. **Delete products** using DELETE /vendor/products/:id


