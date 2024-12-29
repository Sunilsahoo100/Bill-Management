import { ADD_BILL, EDIT_BILL, REMOVE_BILL } from '../actions/billActions';
import { saveBillsToLocalStorage, loadBillsFromLocalStorage } from '../store/localStorageUtils';

// Initialize state from localStorage or default to an empty array
const initialState = loadBillsFromLocalStorage() || [];

const billsReducer = (state = initialState, action) => {
  let updatedState;

  switch (action.type) {
    case ADD_BILL:
      updatedState = [...state, action.payload]; // Add a new bill
      break;

    case EDIT_BILL:
      updatedState = state.map((bill) =>
        bill.id === action.payload.id ? { ...bill, ...action.payload.updatedBill } : bill
      ); // Update the bill with the matching ID
      break;

    case REMOVE_BILL:
      updatedState = state.filter((bill) => bill.id !== action.payload); // Remove the bill with the matching ID
      break;

    default:
      updatedState = state; // Return the current state if no matching action
  }

  // Save the updated state to localStorage
  saveBillsToLocalStorage(updatedState);

  return updatedState; // Return the updated state
};

export default billsReducer;
