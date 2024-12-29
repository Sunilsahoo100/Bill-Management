const BILLS_KEY = 'bills';

// Save bills to localStorage
export const saveBillsToLocalStorage = (bills) => {
  try {
    localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
  } catch (error) {
    console.error('Error saving bills to localStorage:', error);
  }
};

// Load bills from localStorage
export const loadBillsFromLocalStorage = () => {
  try {
    const storedBills = localStorage.getItem(BILLS_KEY);
    return storedBills ? JSON.parse(storedBills) : [];
  } catch (error) {
    console.error('Error loading bills from localStorage:', error);
    return [];
  }
};
