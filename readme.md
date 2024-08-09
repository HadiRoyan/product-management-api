# User & Product Management API
This project is a simple Node.js-based API that manages users and products. Available features include:
- User Management: Registration, login, and getting user information.
- Product Management: CRUD (Create, Read, Update, Delete) products.

## Installation
1. Clone project  
    ```
    git clone https://github.com/username/nodejs-user-product-management.git
    cd nodejs-user-product-management   
    ```

2. Install Dependencies
    ```
    npm install
    ```

3. Setup Database  
Make sure you have MySQL running, then create the required database and tables
    ```
    CREATE DATABASE product_management;
    USE product_management;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )

    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    );
    ```

4. Configure Database Connection  
Update the db.js file with your database configuration

5. Running the App
After all the setup is complete, run the application with the command:
    ```
    node app.js
    ```