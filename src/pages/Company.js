import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'; // Adjust the import path as needed
import fetchWithAuth from '../utils/api'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await fetchWithAuth('companies', {
          method: 'GET',
        });
        setCompanies(data);
      } catch (error) {
        setError('Failed to fetch companies');
      }
    };

    fetchCompanies();
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
        await fetchWithAuth(`companies/${id}`, {
          method: 'DELETE',
        });
        setCompanies(companies.filter((company) => company.ID !== id));
        Swal.fire(
          'Deleted!',
          'The company has been deleted.',
          'success'
        );
      } catch (error) {
        setError('Failed to delete company');
        console.error('Error:', error);
        Swal.fire(
          'Error!',
          'Failed to delete the company. Please try again.',
          'error'
        );
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className='display-6'>Companies</div>
        <div className='row mt-4'>
          <div className='col'>
            <a className='btn btn-primary btn-sm' href='/companies/add'>Add <i className='fa fa-solid fa-plus fa-sm' /></a>
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
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.ID}>
                    <td>{company.ID}</td>
                    <td>{company.name}</td>
                    <td>{company.address}</td>
                    <td>{company.email}</td>
                    <td>{company.phone}</td>
                    <td>{new Date(company.CreatedAt).toLocaleString()}</td>
                    <td>{new Date(company.UpdatedAt).toLocaleString()}</td>
                    <td>
                      <a className='btn btn-warning btn-sm mx-1' href={'/companies/edit/'+company.ID}>Edit <i className='fa fa-pencil fa-solid fa-sm' /></a>
                      <button
                        className='btn btn-danger btn-sm mx-1'
                        onClick={() => handleDelete(company.ID)}
                      >
                        Delete <i className='fa fa-trash fa-solid fa-sm' />
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

export default Company;
