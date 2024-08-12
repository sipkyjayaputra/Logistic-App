import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const PaymentTerm = () => {
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentTerms = async () => {
      try {
        const data = await fetchWithAuth('payment-terms', {
          method: 'GET',
        });
        setPaymentTerms(data);
      } catch (error) {
        setError('Failed to fetch payment terms');
      }
    };

    fetchPaymentTerms();
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
        await fetchWithAuth(`payment-terms/${id}`, {
          method: 'DELETE',
        });
        setPaymentTerms(paymentTerms.filter((term) => term.ID !== id));
        Swal.fire(
          'Deleted!',
          'Your payment term has been deleted.',
          'success'
        );
      } catch (error) {
        setError('Failed to delete payment term');
        console.error('Error:', error);
        Swal.fire(
          'Error!',
          'Failed to delete payment term. Please try again.',
          'error'
        );
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className='display-6'>Payment Terms</div>
        <div className='row mt-4'>
          <div className='col'>
            <a className='btn btn-primary btn-sm' href='/payment-terms/add'>Tambah <i className='fa fa-solid fa-plus fa-sm' /></a>
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
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentTerms.map((term) => (
                  <tr key={term.ID}>
                    <td>{term.ID}</td>
                    <td>{term.name}</td>
                    <td>{new Date(term.CreatedAt).toLocaleString()}</td>
                    <td>{new Date(term.UpdatedAt).toLocaleString()}</td>
                    <td>
                      <a className='btn btn-warning btn-sm mx-1' href={'/payment-terms/edit/'+term.ID}>Ubah <i className='fa fa-pencil fa-solid fa-sm' /></a>
                      <button
                        className='btn btn-danger btn-sm mx-1'
                        onClick={() => handleDelete(term.ID)}
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

export default PaymentTerm;
