import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BillList = ({ bills, highlightedBills, onEditBill, onRemoveBill }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  // Filter bills by search query and category
  const filteredBills = bills.filter((bill) => {
    const matchesName = bill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? bill.category === filterCategory
      : true;
    return matchesName && matchesCategory;
  });

  // Handle Edit Button Click
  const handleEditClick = (bill) => {
    setEditingBill(bill);
    setFormData({
      name: bill.name,
      amount: bill.amount,
      category: bill.category,
      date: bill.date,
      description: bill.description,
    });
    setEditModalOpen(true);
  };

  // Handle Form Input Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Submit
  const handleEditSubmit = () => {
    if (editingBill) {
      const updatedBill = { ...editingBill, ...formData };
      onEditBill(updatedBill);
      setEditModalOpen(false);
      setEditingBill(null);
    }
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingBill(null);
  };

  // Prepare data for the monthly chart
  const getMonthlyChartData = () => {
    const monthlyTotals = Array(12).fill(0);

    bills.forEach((bill) => {
      const billDate = new Date(bill.date);
      const month = billDate.getMonth(); // 0 = January, 11 = December
      monthlyTotals[month] += parseFloat(bill.amount);
    });

    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Monthly Billing Cycle",
          data: monthlyTotals,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-center text-blue-600 text-xl mb-4">Added Bills</h3>

      {/* Search and Category Filter */}
      <div className="flex gap-4 mb-4 items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md"
        />

        {/* Category Filter Dropdown */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="FoodNDining">Food & Dining</option>
          <option value="Car Wash">Car Wash</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Travel">Travel</option>
        </select>

        {/* Show Chart Button */}
        <button
          onClick={() => setShowChart(!showChart)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {showChart ? "Hide Chart" : "Show Monthly Chart"}
        </button>
      </div>

      {/* Monthly Chart */}
      {showChart && (
        <div className="mb-6">
          <Line data={getMonthlyChartData()} key={JSON.stringify(getMonthlyChartData())} />
        </div>
      )}

      {/* Filtered Bill List */}
      {filteredBills.length > 0 ? (
        filteredBills.map((bill) => (
          <div
            key={bill.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-sm mb-3 ${
              highlightedBills.includes(bill.id) ? "bg-yellow-100" : "bg-gray-50"
            }`}
          >
            <div>
              <p className="font-bold text-gray-800">{bill.name}</p>
              <p className="text-gray-600">
                ₹{bill.amount} | {bill.date} | {bill.category}
              </p>
              {bill.description && (
                <p className="text-sm text-gray-500">{bill.description}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(bill)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onRemoveBill(bill.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No bills match your criteria.</p>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-center text-lg font-bold mb-4">Edit Bill</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 px-4 py-2 rounded-3xl hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillList;
