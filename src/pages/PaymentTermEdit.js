import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const PaymentTermEdit = () => {
  const { id } = useParams(); // Get the payment term ID from the URL
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the existing payment term data when the component mounts
    const fetchPaymentTerm = async () => {
      try {
        const data = await fetchWithAuth(`payment-terms/${id}`, {
          method: 'GET',
        });
        setName(data.name);
      } catch (error) {
        setError('Failed to fetch payment term');
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch payment term. Please try again.',
        });
      }
    };

    fetchPaymentTerm();
  }, [id]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(`payment-terms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Payment term updated successfully!',
      });

    //   setTimeout(() => navigate('/payment-terms'), 2000); // Redirect to the payment terms page after 2 seconds
    } catch (error) {
      setError('Failed to update payment term');
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update payment term. Please try again.',
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="display-6">Edit Payment Term</div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="lead">Payment Term Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              name="name"
              placeholder="Enter payment term name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <a className="btn btn-danger btn-sm mx-1" href="/payment-terms">
              Kembali
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

export default PaymentTermEdit;
