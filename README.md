Simple Customer Directory
Project Overview:
This project is a Customer Directory application that mimics a simple admin dashboard. It allows users to:
1.	List all customers.
2.	Add a new customer.
3.	Delete a customer.
It consists of a backend (Node.js + Express.js) and a frontend (React), with a MySQL database. The backend handles the CRUD operations for managing customers, while the frontend allows users to interact with the data.
 
Tech Stack:
Backend:
•	Node.js and Express.js for creating the API and managing requests.
•	MySQL for storing customer data.
•	API Endpoints:
o	GET /customers: Lists all customers.
o	POST /customers: Adds a new customer.
o	DELETE /customers/:id: Deletes a customer.
Frontend:
•	React.js with hooks for building the user interface.
•	Axios for making HTTP requests to interact with the backend.
 
Features:
•	Display List of Customers: Fetches and displays a list of customers from the backend.
•	Add a Customer: Allows the user to add a new customer with validation (e.g., email, phone, and company name).
•	Delete a Customer: Provides a button to delete a customer.
 
Assumptions:
•	Auto-incrementing ID: The ID for each customer is auto-generated and cannot be repeated. The ID starts from 1 and increments with each new customer.
•	Data Validation:
o	The email must be valid.
o	Name, company name, and phone number must be provided.
o	The phone number must follow the format XXX-XXX-XXXX.
o	The contract start date and contract expiry date must be in the correct format YYYY-MM-DD.
 
How to Run the Backend Locally:
Prerequisites:
•	Node.js installed on your machine.
•	MySQL running on your local machine.
•	Ensure that you have a customerdb database created in MySQL with the customers table.
Steps to Run the Backend:
1.	Clone the repository and navigate to the backend folder:
git clone <repository_url>
cd backend
2.	Install the dependencies:
npm install
3.	Set up the database:
o	Ensure that your database (customerdb) is running, and the customers table is created.
4.	Start the backend:
node app.js
The backend should now be running on http://localhost:3001.
 
How to Run the Frontend Locally:
Prerequisites:
•	Node.js installed on your machine.
Steps to Run the Frontend:
1.	Navigate to the frontend folder:
cd frontend
2.	Install the dependencies:
npm install
3.	Start the frontend:
npm start
The frontend should now be running on http://localhost:3000.
4.	Ensure that the frontend is connected to the backend:
o	The frontend makes requests to http://localhost:3001 for customer-related operations.
 
Extra Features:
•	Email Duplicate Check: Before adding a new customer, the application checks if the email already exists in the database to avoid duplicates.
•	Profile Picture: Each customer can have a profile picture represented by a URL (e.g., PNG or JPEG image).
 
Files Overview:
•	backend/app.js: Main backend server file. Handles the API routes for managing customers.
•	backend/database.js: Handles the database connection and CRUD operations for the customers.
•	frontend/src/CustomerDirectory.js: The main React component that displays the customer list, and provides forms for adding and deleting customers.

