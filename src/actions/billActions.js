export const ADD_BILL = 'ADD_BILL';
export const EDIT_BILL = 'EDIT_BILL';
export const REMOVE_BILL = 'REMOVE_BILL';

export const addBill = (bill) => ({ type: ADD_BILL, payload: bill });
export const editBill = (id, updatedBill) => ({ type: EDIT_BILL, payload: { id, updatedBill } });
export const removeBill = (id) => ({ type: REMOVE_BILL, payload: id });
