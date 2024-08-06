import React, { useState, useEffect } from 'react';

const App = () => {
  const [packingList, setPackingList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackingList = async () => {
      try {
        const response = await fetch('http://localhost:8080/packinglists/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPackingList(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPackingList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {packingList && (
        <>
          <h1 style={{ textAlign: 'center' }}>PACKING LIST</h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2>Issuer:</h2>
              <p>"{packingList.issuer}"</p>
            </div>
            <div>
              <h2>To:</h2>
              <p>"{packingList.to}"</p>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p><strong>S/C No.:</strong> {packingList.no_sc}</p>
            <p><strong>Date:</strong> {new Date(packingList.date).toLocaleDateString()}</p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Marks and Numbers</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Description of Goods</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>HS Code</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Number of Packages</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Gross Weight (KG)</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Net Weight (KG)</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
              </tr>
            </thead>
            <tbody>
              {packingList.products.map((product) => (
                <tr key={product.ID}>
                  <td style={{ border: '1px solid black', padding: '8px' }}></td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.hs_code}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.num_packages}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.quantity} {product.quantity_unit}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.gross_weight}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{product.nett_weight}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {product.image && (
                      <img
                      src={product.image}
                        alt={product.name}
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      />
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>TOTAL</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{packingList.total_packages} packages</td>
                <td></td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{packingList.total_gross_weight} KG</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{packingList.total_nett_weight} KG</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
