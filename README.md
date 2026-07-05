# E-Commerce Backend API

## Project Overview

This project is an E-Commerce Backend API developed using Node.js, Express.js, and MongoDB. It provides the backend services for an online store, including user authentication, product management, and order handling.

---

## Project Structure

```text
project-e-youth/
│
├── config/
│   └── Database configuration files
│
├── controllers/
│   └── Business logic for handling requests
│
├── middleware/
│   └── Authentication and custom middleware
│
├── models/
│   └── MongoDB (Mongoose) models
│
├── routes/
│   └── API route definitions
│
├── utilities/
│   └── Helper and utility functions
│
├── .env
├── .gitignore
├── app.js
├── seed.js
└── server.js
```

---

## Folder Description

- **config** – Contains project configuration files such as the database connection.
- **controllers** – Contains the application logic for each API endpoint.
- **middleware** – Stores middleware functions such as authentication and error handling.
- **models** – Contains the Mongoose schemas for the database.
- **routes** – Defines all API routes.
- **utilities** – Contains reusable helper functions.
- **app.js** – Configures the Express application.
- **server.js** – Starts the server.
- **seed.js** – Seeds the database with sample data.
- **.env** – Stores environment variables.
- **.gitignore** – Specifies files and folders ignored by Git.

---

## Installation

```bash
npm install
```

Start the server:

```bash
npm start
```
or

```bash
npm run dev
```

---

## Author

Semester Project – Backend Development Course

Developed by **karim ashram**

[project](https://github.com/G1itch2/e-youth-project)
