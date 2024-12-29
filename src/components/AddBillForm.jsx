import React, { useState } from "react";

const AddBillForm = ({ addBill }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.amount && formData.category && formData.date) {
      addBill(formData); // Pass the new bill to the parent component
      setFormData({ name: "", amount: "", category: "", description: "", date: "" }); // Reset the form
    } else {
      alert("Please fill all mandatory fields!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-center text-blue-600 text-xl mb-4">Add a New Bill</h3>
      <div className="mb-4">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a Category</option>
          <option value="FoodNDining">Food & Dining</option>
          <option value="Car Wash">Car Wash</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Optional"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-3xl hover:bg-blue-700"
      >
        Add Bill
      </button>
    </form>
  );
};

export default AddBillForm;
