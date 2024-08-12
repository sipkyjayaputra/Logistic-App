import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const CommercialInvoiceEdit = () => {
  const { id } = useParams(); // Get the invoice ID from the URL
  const navigate = useNavigate(); // For navigation after form submission
  const [invoice, setInvoice] = useState({
    invoice_no: '',
    issuer_name: '',
    issuer_address: '',
    issuer_email: '',
    issuer_phone: '',
    receiver_name: '',
    receiver_address: '',
    receiver_email: '',
    receiver_phone: '',
    notify_party: false,
    party_name: '',
    party_address: '',
    party_email: '',
    party_phone: '',
    no_sc: '',
    date: '',
    transport_detail: '',
    payment_term_id: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the existing commercial invoice data when the component mounts
    const fetchInvoice = async () => {
      try {
        const data = await fetchWithAuth(`commercial-invoices/${id}`, {
          method: 'GET',
        });
        setInvoice(data);
      } catch (error) {
        setError('Failed to fetch commercial invoice');
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch commercial invoice. Please try again.',
        });
      }
    };

    fetchInvoice();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(`commercial-invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoice),
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Commercial invoice updated successfully!',
      }).then(() => {
        navigate('/commercial-invoices'); // Redirect to the commercial invoices page after success
      });
    } catch (error) {
      setError('Failed to update commercial invoice');
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update commercial invoice. Please try again.',
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="display-6">Edit Commercial Invoice</div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="invoice_no" className="lead">Invoice No</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="invoice_no"
              name="invoice_no"
              placeholder="Enter invoice number"
              value={invoice.invoice_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuer_name" className="lead">Issuer Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="issuer_name"
              name="issuer_name"
              placeholder="Enter issuer name"
              value={invoice.issuer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuer_address" className="lead">Issuer Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="issuer_address"
              name="issuer_address"
              placeholder="Enter issuer address"
              value={invoice.issuer_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuer_email" className="lead">Issuer Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="issuer_email"
              name="issuer_email"
              placeholder="Enter issuer email"
              value={invoice.issuer_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuer_phone" className="lead">Issuer Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="issuer_phone"
              name="issuer_phone"
              placeholder="Enter issuer phone"
              value={invoice.issuer_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiver_name" className="lead">Receiver Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="receiver_name"
              name="receiver_name"
              placeholder="Enter receiver name"
              value={invoice.receiver_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiver_address" className="lead">Receiver Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="receiver_address"
              name="receiver_address"
              placeholder="Enter receiver address"
              value={invoice.receiver_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiver_email" className="lead">Receiver Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="receiver_email"
              name="receiver_email"
              placeholder="Enter receiver email"
              value={invoice.receiver_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiver_phone" className="lead">Receiver Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="receiver_phone"
              name="receiver_phone"
              placeholder="Enter receiver phone"
              value={invoice.receiver_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notify_party" className="lead">Notify Party</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="notify_party"
              name="notify_party"
              checked={invoice.notify_party}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="party_name" className="lead">Party Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="party_name"
              name="party_name"
              placeholder="Enter party name"
              value={invoice.party_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="party_address" className="lead">Party Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="party_address"
              name="party_address"
              placeholder="Enter party address"
              value={invoice.party_address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="party_email" className="lead">Party Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="party_email"
              name="party_email"
              placeholder="Enter party email"
              value={invoice.party_email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="party_phone" className="lead">Party Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="party_phone"
              name="party_phone"
              placeholder="Enter party phone"
              value={invoice.party_phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="no_sc" className="lead">SC Number</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="no_sc"
              name="no_sc"
              placeholder="Enter SC number"
              value={invoice.no_sc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">            <label htmlFor="date" className="lead">Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="date"
              name="date"
              value={invoice.date.slice(0, 10)} // Slice to format as YYYY-MM-DD
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transport_detail" className="lead">Transport Detail</label>
            <textarea
              className="form-control form-control-sm"
              id="transport_detail"
              name="transport_detail"
              placeholder="Enter transport detail"
              value={invoice.transport_detail}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment_term_id" className="lead">Payment Term ID</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="payment_term_id"
              name="payment_term_id"
              placeholder="Enter payment term ID"
              value={invoice.payment_term_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <a className="btn btn-danger btn-sm mx-1" href="/commercial-invoices">
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

export default CommercialInvoiceEdit;

