# Module2_Assignment - Backend API Basics

This project is part of a backend assignment to create a basic RESTful API using **Express.js** and **TypeScript**. It handles user registration, login, and user retrieval for a Learning Management System (LMS).

## 🚀 Features

- ✅ User Registration (POST `/api/register`)
- ✅ User Login (POST `/api/login`)
- ✅ Get User by ID (GET `/api/user/:id`)
- ✅ Custom Logging Middleware
- ✅ Error Handling Middleware
- ✅ Postman Collection Included

---

## 📁 Project Structure

```

Module2\_Assignment/
├── src/
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── models/
│   │   └── user.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── postman\_collection.json
└── README.md

````

---

## 🛠 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/Module2_Assignment.git

# Navigate into the project
cd Module2_Assignment

# Install dependencies
npm install

# Run the server in development mode
npx ts-node src/server.ts
````

> Make sure you're using Node.js and TypeScript installed globally.

---

## 📮 API Endpoints

### POST `/api/register`

Registers a new user.

**Request Body:**

```json
{
  "name": "Harshitha",
  "email": "harshitha@example.com",
  "password": "pass123"
}
```

---

### POST `/api/login`

Logs in a user.

**Request Body:**

```json
{
  "id": 1
  "email": "harshitha@example.com",
  "password": "pass123"
}
```

---

### GET `/api/user/:id`

Retrieves a user by ID.

**Example:**

```
GET /api/user/1
```

---

## 🔎 Middleware

### ✅ logger.ts

Logs every incoming request method and URL.

### ✅ errorHandler.ts

Handles and responds to server errors.

---

## 📫 Postman Collection

A ready-to-test collection is included as:

```
postman_collection.json
```

You can import it into Postman to test all endpoints.

---

## 👩‍💻 Author

* **Harshitha Polisetty**
