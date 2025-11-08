Vibe Commerce - Mock E-Commerce Cart

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for the Vibe Commerce screening. It simulates a basic e-commerce shopping cart, complete with product listing, cart management, and a mock checkout, with bonus features including user-specific carts and real product data integration.

📸 Screenshots

Products Page

Products are dynamically loaded from the Fake Store API.
<img width="1919" height="1199" alt="Screenshot 2025-11-08 121453" src="https://github.com/user-attachments/assets/f53363fc-6643-4cfe-9cc3-574bf41ac38f" />

Cart & Checkout Form

The cart and checkout form on the same page.
<img width="1919" height="559" alt="Screenshot 2025-11-08 121515" src="https://github.com/user-attachments/assets/f3f409d2-441d-4316-9d3f-5ee17a1b88b0" />
<img width="1511" height="364" alt="Screenshot 2025-11-08 121534" src="https://github.com/user-attachments/assets/f1ec6e0f-7cd3-41d8-bc57-55993286fd05" />

Receipt Modal

A mock receipt is shown after a successful checkout.
<img width="1917" height="1199" alt="Screenshot 2025-11-08 121544" src="https://github.com/user-attachments/assets/d0573b6e-40c8-4042-a049-8b7a7489b48c" />

✨ Features

Core Requirements

Product Listing: Fetches and displays a grid of products from the backend.

Shopping Cart: Full cart functionality:

Add items to the cart.

Remove items from the cart.

View cart contents and a running total.

Mock Checkout: A simple form (name/email) that "completes" the purchase, clears the cart, and displays a mock receipt.

Bonus Features Implemented

Fake Store API Integration: The database is automatically seeded with real product data from fakestoreapi.com instead of static mock data.

User-Specific Cart (DB Persistence): The cart is not global. It's persistent and tied to a hardcoded "mock user ID," simulating how a real, logged-in user's cart would be saved in the database.

Frontend Error Handling: The UI displays a friendly, non-intrusive error message if an API call fails (e.g., "Failed to add item to cart").

🛠 Tech Stack

Frontend: React (with Hooks), Tailwind CSS, Axios

Backend: Node.js, Express

Database: MongoDB (with Mongoose)

🚀 Setup and Installation

You will need two terminals running concurrently to run both the backend and frontend servers.

Prerequisites

Node.js (v14+)

MongoDB Atlas Account (or a local MongoDB instance)

1. Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create an environment file:
Create a file named .env in the /backend root.

Add your MongoDB URI:
Open the .env file and add your connection string. (Remember to replace the password and database name).

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.an2tk.mongodb.net/<databasename>?retryWrites=true&w=majority


Run the backend server:

npm run dev


The server will start on http://localhost:5000. On its first run, it will automatically connect to MongoDB, fetch 10 products from the Fake Store API, and save them to your products collection.

2. Frontend Setup

Open a new terminal.

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the frontend app:

npm start


The React app will automatically open in your browser at http://localhost:3000 and connect to your backend.

🧠 Explanations (Bonus Features)

1. Why use the Fake Store API?

Using the Fake Store API provides realistic data (titles, prices, images) without hard-coding a mock JSON array. This demonstrates the ability to integrate with third-party APIs, which is a common real-world task. The seeder function is also idempotent, meaning it checks if data already exists before adding it, preventing duplicates on server restarts.

2. How does the Mock User Persistence work?

A common "junior" approach is to build a global cart, where all users see the same items. This implementation is more advanced.

The CartItem model in MongoDB includes a userId field.

The frontend App.js defines a hardcoded MOCK_USER_ID.

Every API request related to the cart (GET, POST, DELETE) sends this ID in a custom X-User-ID header.

The backend API routes are protected and filtered. For example, GET /api/cart will only find cart items where userId matches the one in the header.

This design correctly simulates a production environment where a user's auth token or session would be used to identify them and retrieve only their data.

3. Why add frontend error handling?

Relying on console.log for errors is fine in development, but it's a poor user experience. If an API call fails silently, the user just thinks the app is broken. By setting an error state and displaying a formatted error message in the UI, we give the user immediate feedback and let them know what happened (e.g., "Failed to add item"), which inspires more confidence in the application.

API Endpoints

All cart/checkout routes are user-specific and require an X-User-ID header.

Method

Endpoint

Description

GET

/api/products

Get all products from the database.

GET

/api/cart

Get the cart items and total for the user.

POST

/api/cart

Add an item to the user's cart. (Body: { productId, quantity })

DELETE

/api/cart/:id

Remove a specific item from the user's cart.

POST

/api/checkout

Mock checkout. Clears the user's cart and returns a receipt.
