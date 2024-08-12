import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const CommercialInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommercialInvoices = async () => {
      try {
        const data = await fetchWithAuth('commercial-invoices', {
          method: 'GET',
        });
        setInvoices(data);
      } catch (error) {
        setError('Failed to fetch commercial invoices');
        console.error('Error:', error);
      }
    };

    fetchCommercialInvoices();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await fetchWithAuth(`commercial-invoices/${id}`, {
          method: 'DELETE',
        });
        setInvoices(invoices.filter((invoice) => invoice.ID !== id));
        Swal.fire(
          'Deleted!',
          'Your commercial invoice has been deleted.',
          'success'
        );
      } catch (error) {
        setError('Failed to delete commercial invoice');
        console.error('Error:', error);
        Swal.fire(
          'Error!',
          'Failed to delete commercial invoice. Please try again.',
          'error'
        );
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className='display-6'>Commercial Invoices</div>
        <div className='row mt-4'>
          <div className='col'>
            <a className='btn btn-primary btn-sm' href='/commercial-invoices/add'>Tambah <i className='fa fa-solid fa-plus fa-sm' /></a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>Issuer Name</th>
                  <th>Receiver Name</th>
                  <th>SC Number</th>
                  <th>Date</th>
                  <th>Transport Detail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.ID}>
                    <td>{invoice.ID}</td>
                    <td>{invoice.invoice_no}</td>
                    <td>{invoice.issuer_name}</td>
                    <td>{invoice.receiver_name}</td>
                    <td>{invoice.no_sc}</td>
                    <td>{new Date(invoice.date).toLocaleString()}</td>
                    <td>{invoice.transport_detail}</td>
                    <td>
                      <a className='btn btn-warning btn-sm mx-1' href={'/commercial-invoices/edit/' + invoice.ID}>Ubah <i className='fa fa-pencil fa-solid fa-sm' /></a>
                      <button
                        className='btn btn-danger btn-sm mx-1'
                        onClick={() => handleDelete(invoice.ID)}
                      >
                        Hapus <i className='fa fa-trash fa-solid fa-sm' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommercialInvoice;
