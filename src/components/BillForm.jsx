import React from "react";
import { Button } from "@/components/ui/button";

const BillForm = ({ formState, setFormState, isEditing, handleAddOrEditBill }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = () => {
    // Check for mandatory fields
    if (!formState.name || !formState.amount || !formState.category || !formState.date) {
      alert("Please fill all mandatory fields: Name, Amount, Category, and Date.");
      return;
    }

    // Check if amount is greater than 0
    if (formState.amount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    handleAddOrEditBill();
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Bill Name */}
      <input
        type="text"
        name="name"
        placeholder="Bill Name *"
        value={formState.name}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-3xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Amount */}
      <input
        type="number"
        name="amount"
        placeholder="Amount *"
        value={formState.amount}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-3xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={formState.category}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-3xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Category *
        </option>
        <option value="FoodNDining">Food & Dining</option>
        <option value="Car Wash">Car Wash</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>

      {/* Date */}
      <input
        type="date"
        name="date"
        value={formState.date}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-3xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Description (Optional) */}
      <textarea
        name="description"
        placeholder="Description (Optional)"
        value={formState.description}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-3xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />

      {/* Add or Update Button */}
      <Button
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
      >
        {isEditing ? "Update" : "Add"} Bill
      </Button>
    </div>
  );
};

export default BillForm;
