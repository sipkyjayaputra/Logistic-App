import React, { useState } from "react";
import Layout from "../components/Layout"; // Adjust the import path as needed
import fetchWithAuth from "../utils/api"; // Adjust the import path as needed
import Swal from "sweetalert2";

const CompanyAdd = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

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
      await fetchWithAuth("companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, email, phone }),
      });
      setName("");
      setAddress("");
      setEmail("");
      setPhone("");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company added successfully!",
      });
    } catch (error) {
      setError("Failed to add company");
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add company. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="display-6">Add New Company</div>
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

export default CompanyAdd;
