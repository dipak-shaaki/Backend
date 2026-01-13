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