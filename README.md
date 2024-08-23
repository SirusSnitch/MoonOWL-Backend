![Logo](./Assets/logo.png)

# MoonOWL Bookstore Backend

Welcome to the backend repository of **MoonOWL Bookstore**. This backend is developed using **Node.js** and **Express**, with **MongoDB** as the database and **Mongoose** for object data modeling (ODM). It provides the API for handling book data, user authentication, and shopping cart functionality, with an admin panel managed by AdminJS.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-instalation)
- [Admin Panel](#admin-panel)
- [Database Schema](#database-schema)
- [Frontend Repository](#frontend-repository)
- [License](#license)


# MoonOWL Bookstore Backend

Welcome to the backend repository of **MoonOWL Bookstore**. This backend is developed using **Node.js** and **Express**, with **MongoDB** as the database and **Mongoose** for object data modeling (ODM). It provides the API for handling book data, user authentication, and shopping cart functionality, with an admin panel managed by AdminJS.

## Features
- RESTful API for managing books (create, read, update, delete)
- User authentication (login, signup) using JSON Web Tokens (JWT)
- Shopping cart mechanism for adding, updating, and removing books
- Order processing and storage in MongoDB
- Admin panel for managing books and orders using AdminJS

## Technologies
- **Node.js**: JavaScript runtime for building scalable network applications
- **Express**: Web framework for handling routing and middleware
- **MongoDB**: NoSQL database for storing books, users, and orders
- **Mongoose**: ODM for modeling and interacting with MongoDB data
- **JWT**: Token-based authentication for securing routes
- **AdminJS**: Admin panel for managing books and orders

## Setup and Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SirusSnitch/MoonOWL-Backend.git
   cd MoonOWL-Backend
   ```

2. **Install dependencies**  
   Install the necessary Node.js dependencies from `package.json`.

3. **Environment Variables**  
   Create a `.env` file at the root of your project with the following keys:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT token generation
   - `PORT`: The port on which the server will run

4. **Run the Application**  
   ```bash
   Node.js server.
   ```

## Admin Panel

The admin panel is provided by Admin Bro and allows you to manage the following:
- **Books**: Add, edit, and delete book entries
- **Orders**: View and manage orders

To access the AdminJS panel, navigate to `/admin` in your browser after starting the server.

## Database Schema

### Users
- **username**
- **email**
- **password (hashed)**

### Books
- **title**
- **Author**
- **description**
- **price**
- **image**

### Orders
- **items**: Array of books (with quantity and price)
- **userId**
- **totalPrice**
- **createdAt**

## Frontend Repository

The frontend for the MoonOWL Bookstore, which handles the user interface and interactions, can be found here:
[MoonOWL Bookstore Frontend](https://github.com/SirusSnitch/MoonOWL-Bookstore)

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](./License.txt) file for details.
