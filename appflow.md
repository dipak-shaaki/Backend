Vendor 
sign up


{
"name": "Test User",
"email": "yesshhh@example.com",
"password": "Password123",
"type": "customer"
}


{"name":"Test User",
"email":"test@example.com",
password":"Password123",
"type":"user"}


middleare banune tesma req.body->valid huna paryo


list get ->/vendors/products
update
delete

add product
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "price": 999.99,
  "categories": ["electronics", "smartphones"],
  "image": "https://example.com/iphone15.jpg"
}


put

{
  "name": "iPhone 15 Pro Max",
  "price": 1199.99
}

## Testing Flow

1. **Signup/Login** to get authenticated
2. **Create products** using POST /vendor/products
3. **View products** using GET /vendor/products
4. **Update products** using PUT /vendor/products/:id
5. **Delete products** using DELETE /vendor/products/:id


testing cart:
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}

// Response will include a token in cookies
// Copy the token value for next requests


get cart
GET http://localhost:3000/cart
Authorization: Bearer {your_token}
Content-Type: application/json

// Expected Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart-item-id",
        "userId": "user-id",
        "productId": "product-id",
        "vendorId": "vendor-id",
        "productName": "Wireless Headphones",
        "productPrice": 99.99,
        "productImage": "https://...",
        "quantity": 2,
        "totalPrice": 199.98,
        "createdAt": "2026-01-16T10:30:00Z",
        "updatedAt": "2026-01-16T10:30:00Z"
      }
    ],
    "summary": {
      "totalItems": 2,
      "totalPrice": 199.98,
      "itemCount": 1
    }
  }
}

add product in cart
POST http://localhost:3000/cart/add
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "productId": "550e8400-e29b-41d4-a716-446655440000",
  "quantity": 2
}

// Expected Response:
{
  "success": true,
  "message": "Product added to cart successfully",
  "data": {
    "items": [
      {
        "id": "new-cart-item-id",
        "productName": "Wireless Headphones",
        "productPrice": 99.99,
        "quantity": 2,
        "totalPrice": 199.98,
        "vendorId": "vendor-id"
      }
    ],
    "summary": {
      "totalItems": 2,
      "totalPrice": 199.98,
      "itemCount": 1
    }
  }
}



update 

PUT http://localhost:3000/cart/update
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "cartItemId": "cart-item-id-here",
  "quantity": 5
}

// Expected Response:
{
  "success": true,
  "message": "Cart item updated successfully",
  "data": {
    "items": [
      {
        "id": "cart-item-id",
        "quantity": 5,
        "totalPrice": 499.95
      }
    ],
    "summary": {
      "totalItems": 5,
      "totalPrice": 499.95,
      "itemCount": 1
    }
  }
}


remove product:
DELETE http://localhost:3000/cart/remove/cart-item-id-here
Authorization: Bearer {your_token}
Content-Type: application/json

// Expected Response:
{
  "success": true,
  "message": "Product removed from cart successfully",
  "data": {
    "items": [],
    "summary": {
      "totalItems": 0,
      "totalPrice": 0,
      "itemCount": 0
    }
  }
}


clear all:
DELETE http://localhost:3000/cart/clear
Authorization: Bearer {your_token}
Content-Type: application/json

// Expected Response:
{
  "success": true,
  "message": "Cart cleared successfully",
  "data": {
    "items": [],
    "summary": {
      "totalItems": 0,
      "totalPrice": 0,
      "itemCount": 0
    }
  }
}



//checkout

POST http://localhost:3000/cart/checkout
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "shippingAddress": "123 Main St, City, Country",
  "paymentMethod": "credit_card",
  "notes": "Please deliver after 5 PM"
}

// Expected Response:
{
  "success": true,
  "data": {
    "success": true,
    "message": "Checkout successful",
    "orderSummary": {
      "totalItems": 2,
      "totalPrice": 199.98,
      "itemCount": 1
    }
  }
}



//postman collection;

{
  "info": {
    "name": "Cart API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Get Cart",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/cart",
          "host": ["{{baseUrl}}"],
          "path": ["cart"]
        }
      }
    },
    {
      "name": "2. Add to Cart",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"productId\": \"550e8400-e29b-41d4-a716-446655440000\",\n  \"quantity\": 2\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/cart/add",
          "host": ["{{baseUrl}}"],
          "path": ["cart", "add"]
        }
      }
    },
    {
      "name": "3. Update Cart Item",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"cartItemId\": \"cart-item-id-here\",\n  \"quantity\": 5\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/cart/update",
          "host": ["{{baseUrl}}"],
          "path": ["cart", "update"]
        }
      }
    },
    {
      "name": "4. Remove from Cart",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/cart/remove/cart-item-id-here",
          "host": ["{{baseUrl}}"],
          "path": ["cart", "remove", "cart-item-id-here"]
        }
      }
    },
    {
      "name": "5. Clear Cart",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/cart/clear",
          "host": ["{{baseUrl}}"],
          "path": ["cart", "clear"]
        }
      }
    },
    {
      "name": "6. Checkout",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"shippingAddress\": \"123 Main St, City\",\n  \"paymentMethod\": \"credit_card\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/cart/checkout",
          "host": ["{{baseUrl}}"],
          "path": ["cart", "checkout"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}


CRUD OPERATIONS - What Customers Can Do:
Operation	Endpoint	Method	What It Does
READ	/cart	GET	Get all cart items with summary
CREATE	/cart/add	POST	Add product to cart (or increase qty if exists)
UPDATE	/cart/update	PUT	Change quantity of existing cart item
DELETE	/cart/remove/:cartItemId	DELETE	Remove single product from cart
DELETE ALL	/cart/clear	DELETE	Empty entire cart
CHECKOUT	/cart/checkout	POST	Complete purchase (clears cart)