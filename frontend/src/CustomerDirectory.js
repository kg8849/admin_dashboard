// frontend/src/CustomerDirectory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDirectory = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    company_name: '',
    phone: '',
    profile_picture_url: '',
    contract_start_date: '',
    contract_expire_date: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch customers from backend (GET /customers)
  useEffect(() => {
    axios.get('http://localhost:3001/customers') // Request to backend API
      .then(res => setCustomers(res.data))
      .catch(err => {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers');
      });
  }, []);

  // Email format validation (Regex)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Phone number validation (XXX-XXX-XXXX format)
  const validatePhoneNumber = (phone) => {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phone);
  };

  // Ensure company name is not a number
  const validateCompanyName = (companyName) => {
    const regex = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
    return regex.test(companyName);
  };

  // Validation before adding a customer
  const validateCustomerData = () => {
    if (!newCustomer.name) {
      setError('Name is required');
      return false;
    }
    if (!newCustomer.company_name) {
      setError('Company name is required');
      return false;
    }
    if (!validateCompanyName(newCustomer.company_name)) {
      setError('Company name must not be a number');
      return false;
    }
    if (!newCustomer.email || !validateEmail(newCustomer.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!newCustomer.phone || !validatePhoneNumber(newCustomer.phone)) {
      setError('Phone number must be in the format XXX-XXX-XXXX');
      return false;
    }
    return true;
  };

  // Function to add a new customer (POST /customers)
  const addCustomer = (e) => {
    e.preventDefault();  // Prevent form from refreshing the page
    setMessage('');  // Reset message
    setError('');    // Reset error

    // Validate the customer data before submitting
    if (!validateCustomerData()) {
      return; // If validation fails, prevent submission
    }

    // POST request to the backend to add a customer
    axios.post('http://localhost:3001/customers', newCustomer)
      .then(() => {
        // After successful addition, fetch the updated customer list
        axios.get('http://localhost:3001/customers')
          .then(res => {
            setCustomers(res.data); // Update the customer list with the latest data
            setNewCustomer({
              name: '',
              email: '',
              company_name: '',
              phone: '',
              profile_picture_url: '',
              contract_start_date: '',
              contract_expire_date: '',
            }); // Reset form fields
            setMessage('Customer added successfully!'); // Success message
          })
          .catch(err => {
            console.error('Error fetching updated customers:', err);
            setError('Failed to refresh customer list');
          });
      })
      .catch(err => {
        console.error('Error adding customer:', err);
        setError('Failed to add customer');
      });
  };

  // Function to delete a customer (DELETE /customers/:id)
  const deleteCustomer = (id) => {
    setMessage('');  // Reset message
    setError('');    // Reset error
    axios.delete(`http://localhost:3001/customers/${id}`) // Request to delete customer via backend API
      .then(() => setCustomers(customers.filter(c => c.id !== id))) // Remove deleted customer from state
      .catch(err => {
        console.error('Error deleting customer:', err);
        setError('Failed to delete customer');
      });
  };

  // Format date as YYYY-MM-DD (for table display)
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero for months
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero for days
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Customer Directory</h1>

      {/* Display success or error messages */}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display customers in a table format */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th> {/* Column for ID */}
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Profile Picture</th>
            <th>Contract Start Date</th>
            <th>Contract Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td> {/* Display the ID */}
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.company_name}</td>
              <td>{customer.phone}</td>
              <td>
                {/* Display the profile picture (as an image) */}
                <img src={customer.profile_picture_url} alt={customer.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{formatDate(customer.contract_start_date)}</td> {/* Format and display start date */}
              <td>{formatDate(customer.contract_expire_date)}</td> {/* Format and display expiry date */}
              <td>
                <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Customer</h2>
      <form onSubmit={addCustomer}>
        <div>
          <label htmlFor="name">Name</label> {/* Header for the Name input field */}
          <input
            type="text"
            id="name" // Link the label to the input
            value={newCustomer.name}
            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label> {/* Header for the Email input field */}
          <input
            type="email"
            id="email" // Link the label to the input
            value={newCustomer.email}
            onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label htmlFor="company_name">Company Name</label> {/* Header for the Company Name input field */}
          <input
            type="text"
            id="company_name" 
            // Link the label to the input
            value={newCustomer.company_name}
            onChange={e => setNewCustomer({ ...newCustomer, company_name: e.target.value })}
            placeholder="Company Name"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label> {/* Header for the Phone input field */}
          <input
            type="text"
            id="phone" 
            // Link the label to the input
            value={newCustomer.phone}
            onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            placeholder="Phone"
            required
          />
        </div>

        <div>
          <label htmlFor="profile_picture_url">Profile Picture URL</label> {/* Header for the Profile Picture URL input field */}
          <input
            id="profile_picture_url" 
            // Link the label to the input
            value={newCustomer.profile_picture_url}
            onChange={e => setNewCustomer({ ...newCustomer, profile_picture_url: e.target.value })}
            placeholder="Profile Picture URL"
            required
          />
        </div>

        <div>
          <label htmlFor="contract_start_date">Contract Start Date</label> {/* Header for the Contract Start Date input field */}
          <input
            type="date"
            id="contract_start_date" 
            value={newCustomer.contract_start_date}
            onChange={e => setNewCustomer({ ...newCustomer, contract_start_date: e.target.value })}
            placeholder="Contract Start Date"
            required
          />
        </div>

        <div>
          <label htmlFor="contract_expire_date">Contract Expiry Date</label> {/* Header for the Contract Expiry Date input field */}
          <input
            type="date"
            id="contract_expire_date" 
            value={newCustomer.contract_expire_date}
            onChange={e => setNewCustomer({ ...newCustomer, contract_expire_date: e.target.value })}
            placeholder="Contract Expiry Date"
            required
          />
        </div>

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default CustomerDirectory;
