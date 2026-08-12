# AgroConnect API Documentation

## Live API

Base URL:

https://agro-connect-server.onrender.com

Health Check:

GET https://agro-connect-server.onrender.com/api/health

---

## 1. Authentication

### Register

**POST** `/api/auth/register`

Request:

```json
{
  "name": "Rahim",
  "email": "rahim@example.com",
  "password": "123456",
  "role": "FARMER"
}
```
Roles:

CUSTOMER  
FARMER      
ADMIN

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {}
}
```

### Login

**POST** `/api/auth/login`

Request:
```json
{
  "email": "rahim@example.com",
  "password": "123456"
}
```
Response:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "JWT_TOKEN",
    "user": {
      "id": "b64304f9-a605-476b-af6d-7ee27f638593",
      "name": "Rahim Farmer",
      "email": "rahim@example.com",
      "role": "FARMER",
      "phone": null,
      "address": null,
      "isDeleted": false,
      "createdAt": "2026-08-11T18:45:58.759Z",
      "updatedAt": "2026-08-11T18:45:58.759Z"
    }
  }
}
```

## 2. Categories
### Create Category

**POST** `/api/categories`

Request:
```json
{
  "name": "Vegetables",
  "description": "Fresh vegetables from local farmers"
}
```
### Get All Categories

**GET** `/api/categories`

**GET** Category By ID

**GET** `/api/categories/:id`

Example:

**GET** `/api/categories/CATEGORY_ID`
### Update Category

**PATCH** `/api/categories/:id`

Request:
```json
{
  "name": "Fresh Vegetables",
  "description": "Fresh vegetables from local farmers"
}
```
### Delete Category

**DELETE** `/api/categories/:id`

Uses soft delete (isDeleted = true).


## 3. Products
### Create Product

**POST** `/api/products`

Request:
```json
{
  "name": "Fresh Tomatoes",
  "description": "Fresh tomatoes directly from the farm",
  "price": 120,
  "quantity": 50,
  "unit": "kg",
  "farmerId": "FARMER_ID",
  "categoryId": "CATEGORY_ID"
}
```
### Product statuses:

AVAILABLE
OUT_OF_STOCK
ARCHIVED
### Get All Products

**GET** `/api/products`

### Get Product By ID

**GET** `/api/products/:id`

Example:

**GET** `/api/products/PRODUCT_ID`
### Update Product

**PATCH** `/api/products/:id`

Request:
```json
{
  "name": "Fresh Red Tomatoes",
  "price": 130,
  "quantity": 40
}
```
### Delete Product

**DELETE** `/api/products/:id`

Uses soft delete (isDeleted = true).


### 4. Reviews
## Create Review

**POST** `/api/reviews`

Request:
```json
{
  "rating": 5,
  "comment": "Very fresh and good quality.",
  "userId": "USER_ID",
  "productId": "PRODUCT_ID"
}
```
Rating must be between 1 and 5.

## Get All Reviews

**GET** `/api/reviews`

Get Review By ID

**GET** `/api/reviews/:id`

Example:

**GET** `/api/reviews/REVIEW_ID`
## Update Review

**PATCH** `/api/reviews/:id`

Request:
```json
{
  "rating": 4,
  "comment": "Good quality product."
}
```
## Delete Review

**DELETE** `/api/reviews/:id`

Uses soft delete (isDeleted = true).

## Technology
Express.js
TypeScript
PostgreSQL
Prisma ORM
JWT
bcrypt
dotenv
CORS
Database

## Main models:

User
Category
Product
Review

## Enums:

UserRole
ProductStatus

Soft delete is implemented using isDeleted.

Created and updated timestamps are implemented using createdAt and updatedAt
