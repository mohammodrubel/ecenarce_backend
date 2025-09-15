# Rocks Mart API Documentation

Welcome to the **Rocks Mart** API! This document contains all available endpoints for managing **users**, **categories**, **brands**, **products**, and **special offers**. You can test all endpoints via **Postman**.

**Postman Collection:** [Import Here](https://wcc-devs.postman.co/workspace/SOLVE-MEET~db0943aa-303e-475d-a061-03d4e72c2c7b/collection/29634377-87c75dc9-25f8-4a4e-ab8c-419ab33944a7?action=share&source=collection_link&creator=29634377)  

---

## Base URL

---

## **USER Endpoints**

| Endpoint | Method | Request Body | Description |
|----------|--------|--------------|-------------|
| `/auth/login` | POST | `{ "email": "rubel@gmail.com", "password": "rubel@gmail.com" }` | Authenticate a user and retrieve a token |
| `/auth/register` | GET | None | Register a new user |

---

## **CATEGORY Endpoints**

| Endpoint | Method | Request Body | Description |
|----------|--------|--------------|-------------|
| `/category` | POST | Form-data:<br>`data` JSON string:<br>`{ "name": "Updated Electronics", "subcategories": ["Mobiles", "Laptops"] }`<br>`file`: image file | Create a new category |
| `/category` | GET | None | Retrieve all categories |
| `/category/:id` | GET | None | Retrieve a single category by ID |
| `/category/:id` | PUT | JSON:<br>`{ "subcategories": ["Mobile","TV"] }` | Update a category by ID |

> Replace `:id` with the actual category UUID.

---

## **BRAND Endpoints**

| Endpoint | Method | Request Body | Description |
|----------|--------|--------------|-------------|
| `/brand` | POST | Form-data:<br>`data` JSON string:<br>`{ "name": "hello", "description": "info" }`<br>`file`: image file | Create a new brand |
| `/brand/:id` | PATCH | Form-data:<br>`file`: image file | Update brand image |
| `/brand/:id` | PATCH | Form-data:<br>`file`: image file | Edit brand data |
| `/brand` | GET | None | Retrieve all brands |
| `/brand/:id` | GET | None | Retrieve a single brand by ID |

> Replace `:id` with the actual brand UUID.

---

## **PRODUCT Endpoints**

| Endpoint | Method | Request Body | Description |
|----------|--------|--------------|-------------|
| `/products` | POST | Form-data:<br>`data` JSON string:<br>`{ "name": "Wireless Bluetooth Headphones", "description": "Noise-cancelling over-ear headphones with long battery life.", "subcategory": "Headphones", "price": 99.99, "originalPrice": 129.99, "stock": 50, "sku": "WH-d2d0dfs2s5-BT", "brandId": "<brand_id>", "categoryId": "<category_id>", "rating": 4.5, "reviewsCount": 128, "badge": "Best Seller", "inStock": true }`<br>`files`: image files | Create a new product |
| `/products` | GET | None | Retrieve all products |
| `/products/:id` | GET | None | Retrieve a single product by ID |

> Replace `:id` with the actual product UUID.

---

## **SPECIAL OFFER Endpoints**

| Endpoint | Method | Request Body | Description |
|----------|--------|--------------|-------------|
| `/special-offer` | GET | None | Create or retrieve special offers |

---

## Notes

- **All file uploads** must be sent as `form-data`.
- Replace `:id` in endpoints with the actual **UUID** of the resource.
- JSON data should follow the structure provided in the examples.
- Base URL can be changed to your production server when deploying.

---

## Example cURL Requests

### Login
```bash
curl -X POST http://localhost:9000/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"rubel@gmail.com","password":"rubel@gmail.com"}'
