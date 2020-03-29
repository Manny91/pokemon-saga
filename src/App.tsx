import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="page-container"></div>
    </Provider>
  );
}

export default App;
