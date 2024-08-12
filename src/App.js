import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PaymentTerm from './pages/PaymentTerm';
import PaymentTermAdd from './pages/PaymentTermAdd';
import PaymentTermEdit from './pages/PaymentTermEdit';
import Company from './pages/Company';
import CompanyAdd from './pages/CompanyAdd';
import CompanyEdit from './pages/CompanyEdit';
import CommercialInvoice from './pages/CommercialInvoice';
import CommercialInvoiceEdit from './pages/CommercialInvoiceEdit';
import CommercialInvoiceAdd from './pages/CommercialInvoiceAdd';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Protected element={<Home />} />} />
        <Route path="/payment-terms/add" element={<Protected element={<PaymentTermAdd />} />} />
        <Route path="/payment-terms/edit/:id" element={<Protected element={<PaymentTermEdit />} />} />
        <Route path="/payment-terms" element={<Protected element={<PaymentTerm />} />} />
        <Route path="/companies/add" element={<Protected element={<CompanyAdd />} />} />
        <Route path="/companies/edit/:id" element={<Protected element={<CompanyEdit />} />} />
        <Route path="/companies" element={<Protected element={<Company />} />} />
        <Route path="/commercial-invoices/add" element={<Protected element={<CommercialInvoiceAdd />} />} />
        <Route path="/commercial-invoices/edit/:id" element={<Protected element={<CommercialInvoiceEdit />} />} />
        <Route path="/commercial-invoices" element={<Protected element={<CommercialInvoice />} />} />
        <Route path="/" element={<Protected element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
