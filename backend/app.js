// backend/app.js
const express = require('express');
const cors = require('cors');
const { getCustomers, addCustomer, deleteCustomer } = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming JSON requests

// Route to get all customers (GET /customers)
app.get('/customers', (req, res) => {
  getCustomers((error, customers) => {
    if (error) {
      console.error('Error fetching customers:', error);
      res.status(500).send('Error retrieving customers');
      return;
    }
    res.json(customers);  // Send the list of customers as a JSON response
  });
});

// Route to add a new customer (POST /customers)
app.post('/customers', (req, res) => {
  const newCustomer = req.body;  // Get the customer data from the request body

  addCustomer(newCustomer, (error) => {
    if (error) {
      console.error('Error adding customer:', error);
      res.status(500).send('Error adding customer');
      return;
    }
    res.status(201).send('Customer added successfully');
  });
});

// Route to delete a customer (DELETE /customers/:id)
app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;  // Get customer ID from request parameters
  deleteCustomer(id, (error) => {
    if (error) {
      console.error('Error deleting customer:', error);
      res.status(500).send('Error deleting customer');
      return;
    }
    res.status(204).send();  // Send a success response with no content
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
