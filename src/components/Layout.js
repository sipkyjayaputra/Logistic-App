import React from 'react';
import Sidebar from './Sidebar'; // Adjust the import path as needed

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
