import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import BillDashboard from "./components/BillDashboard";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BillDashboard />
    </Provider>
  );
}

export default App;
