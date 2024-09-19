# reBooked - College Textbook Marketplace

## Description

reBooked is a textbook marketplace designed specifically for college students, offering a platform to easily buy and sell used textbooks. Students can search for books by author, title, or subject, while sellers can list their books with details like condition, price, and images. Buyers can browse available books, compare prices, and complete their purchases through a simple and secure checkout process. The platform aims to make it easy for students to save money on textbooks and make some extra cash by selling their unwanted books.

## Table of Contents

- [Description](#description)
- [Instructions](#instructions)
- [Required Packages](#required-packages)
- [Installation](#installation)

## Instructions

1. **For Buyers**:
    - Search for textbooks by entering the title, author, or subject in the search bar.
    - Browse through the available listings, check the book’s condition, and view the seller’s details.
    - Add the desired book to the cart and proceed to checkout with a secure payment process.

2. **For Sellers**:
    - Create an account or log in to your existing account.
    - List your textbooks by providing details such as title, author, condition, price, and an optional image.
    - Manage your listings through your user dashboard, where you can edit or remove your listings.

3. **User Dashboard**:
    - Manage your account, view your purchase/sale history, and track ongoing transactions.

## Required Packages

- **Express.js**: For building the backend API and routing.
- **MongoDB**: As the database for storing user, book, and transaction data.
- **Mongoose**: As the ODM to interact with MongoDB.
- **React.js**: For building the front-end user interface.
- **Redux**: For managing the global state of the application.
- **Stripe API**: For handling secure payment processing.
- **Cloudinary** (or similar service): For hosting and managing book images.
- **bcrypt**: For securely hashing user passwords.
- **JWT**: For handling user authentication.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mbdrag3/ReBooked.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ReBooked
    ```

3. Install the backend dependencies:
    ```bash
    cd server
    npm install
    ```

4. Install the frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

5. Set up environment variables:
    - Create a `.env` file in the `server` directory with the following:
      ```env
      MONGODB_URI=mongodb://localhost:27017/rebooked
      JWT_SECRET=your_jwt_secret
      CLOUDINARY_API_KEY=your_cloudinary_key
      CLOUDINARY_API_SECRET=your_cloudinary_secret
      STRIPE_SECRET_KEY=your_stripe_secret_key
      ```

6. Start the application:
    - Run the backend server:
      ```bash
      cd ../server
      npm start
      ```
    - Run the frontend React app:
      ```bash
      cd ../client
      npm start
      ```

7. Open the application in your browser at `http://localhost:3000`.

8. Test the platform by signing up as a buyer or seller and listing or purchasing a textbook.

