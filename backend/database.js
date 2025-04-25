// backend/database.js
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kritigoel',  // Replace with your MySQL password
  database: 'customerdb',
  port: 3306
});

// Function to get all customers
function getCustomers(callback) {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      console.error('Error fetching customers:', error);
      callback(error, null);
      return;
    }
    callback(null, results);  // Return the results to the callback
  });
}

// Function to add a new customer (Auto-incrementing id)
function addCustomer(customer, callback) {
  const { name, email, company_name, phone, profile_picture_url, contract_start_date, contract_expire_date } = customer;

  const query = `
    INSERT INTO customers (name, email, company_name, phone, profile_picture_url, contract_start_date, contract_expire_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [name, email, company_name, phone, profile_picture_url, contract_start_date, contract_expire_date], (error, results) => {
    if (error) {
      console.error('Error adding customer:', error);
      callback(error);
      return;
    }
    callback(null);  // Success, proceed
  });
}

// Function to delete a customer by ID
function deleteCustomer(id, callback) {
  pool.query('DELETE FROM customers WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting customer:', error);
      callback(error);
      return;
    }
    callback(null);  // Success, proceed
  });
}

module.exports = { getCustomers, addCustomer, deleteCustomer };
