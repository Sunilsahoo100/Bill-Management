import React, { useState, useEffect } from "react";
import AddBillForm from "./AddBillForm";
import BillList from "./BillList";
import BudgetCalculator from "./BudgetCalculator";
import Navbar from "./Navbar";
import { saveBillsToLocalStorage, loadBillsFromLocalStorage } from "../store/localStorageUtils";

const BillDashboard = () => {
  const [bills, setBills] = useState([]);
  const [highlightedBills, setHighlightedBills] = useState([]); // Store highlighted bills

  useEffect(() => {
    const storedBills = loadBillsFromLocalStorage();
    setBills(storedBills);
  }, []);

  const addBill = (bill) => {
    const newBill = { ...bill, id: Date.now() };
    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    saveBillsToLocalStorage(updatedBills);
  };

  const editBill = (updatedBill) => {
    const updatedBills = bills.map((bill) =>
      bill.id === updatedBill.id ? updatedBill : bill
    );
    setBills(updatedBills);
    saveBillsToLocalStorage(updatedBills);
  };

  const removeBill = (id) => {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
    saveBillsToLocalStorage(updatedBills);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-screen overflow-hidden" style={{ paddingTop: "64px" }}>
        {/* Left Side Panel */}
        <div
          className="w-1/3 p-4 bg-white rounded-lg shadow-md"
          style={{ position: "fixed", height: "calc(100% - 64px)" }}
        >
          <AddBillForm addBill={addBill} />
          <BudgetCalculator bills={bills} onHighlightBills={setHighlightedBills} />
        </div>

        {/* Right Side Panel */}
        <div
          className="flex-1 ml-[34%] p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100% - 64px)" }}
        >
          <BillList
            bills={bills}
            highlightedBills={highlightedBills} // Pass highlighted bills
            onEditBill={editBill}
            onRemoveBill={removeBill}
          />
        </div>
      </div>
    </div>
  );
};

export default BillDashboard;