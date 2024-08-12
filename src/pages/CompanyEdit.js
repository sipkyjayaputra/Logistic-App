import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const CompanyEdit = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the existing company data when the component mounts
    const fetchCompany = async () => {
      try {
        const data = await fetchWithAuth(`companies/${id}`, {
          method: 'GET',
        });
        setName(data.name);
        setAddress(data.address);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        setError('Failed to fetch company data');
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch company data. Please try again.',
        });
      }
    };

    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "address") setAddress(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(`companies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, email, phone }),
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Company updated successfully!',
      });

      // setTimeout(() => navigate('/companies'), 2000); // Uncomment if you want to redirect to the companies page after 2 seconds
    } catch (error) {
      setError('Failed to update company');
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update company. Please try again.',
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="display-6">Edit Company</div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="lead">Company Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              name="name"
              placeholder="Enter company name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="address" className="lead">Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="address"
              name="address"
              placeholder="Enter company address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email" className="lead">Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              placeholder="Enter company email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="phone" className="lead">Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="phone"
              name="phone"
              placeholder="Enter company phone number"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <a className="btn btn-danger btn-sm mx-1" href="/companies">
              Back
            </a>
            <button type="submit" className="btn btn-sm btn-primary mx-1">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CompanyEdit;
