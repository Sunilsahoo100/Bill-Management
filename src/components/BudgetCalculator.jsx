import React, { useState } from "react";

const BudgetCalculator = ({ bills, onHighlightBills }) => {
  const [budget, setBudget] = useState("");
  const [selectedBills, setSelectedBills] = useState([]);
  const [minimumBills, setMinimumBills] = useState(null); // Use null to indicate no calculation yet

  const handleCalculate = () => {
    // Ensure budget is valid
    if (!budget || budget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    // Sort bills by amount (descending)
    const sortedBills = [...bills].sort((a, b) => b.amount - a.amount);

    let total = 0;
    let count = 0;
    const selected = [];

    for (let bill of sortedBills) {
      const billAmount = parseFloat(bill.amount); // Ensure amount is treated as a number
      if (total + billAmount <= budget) {
        total += billAmount;
        count += 1;
        selected.push(bill.id); // Push only the ID for highlighting
      } else {
        break;
      }
    }

    // Update states with results
    setMinimumBills(count);
    setSelectedBills(selected);

    // Notify parent to highlight the selected bills
    onHighlightBills(selected);
  };

  const handleBudgetChange = (e) => {
    setBudget(Number(e.target.value)); // Ensure budget is treated as a number
    setMinimumBills(null); // Clear previous results when budget changes
    setSelectedBills([]); // Clear selected bills when budget changes
    onHighlightBills([]); // Clear highlighting when budget changes
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-center text-blue-600 text-xl mb-4">Budget Calculator</h3>

      {/* Input for Monthly Budget */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Monthly Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter your monthly budget"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-3 rounded-3xl font-semibold hover:bg-blue-700"
      >
        Calculate
      </button>

      {/* Display Results */}
      {minimumBills !== null && (
        <div className="mt-4">
          <h4 className="text-center text-green-600 text-lg">Minimum Bills: {minimumBills}</h4>
          
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
