import React, { useState } from "react";
import Layout from "../components/Layout"; // Adjust the import path as needed
import fetchWithAuth from "../utils/api"; // Adjust the import path as needed
import Swal from "sweetalert2";

const PaymentTermAdd = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth("payment-terms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      setName("");
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Payment term added successfully!",
      });
    } catch (error) {
      setError("Failed to add payment term");
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add payment term. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="display-6">Payment Terms</div>
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

export default PaymentTermAdd;
