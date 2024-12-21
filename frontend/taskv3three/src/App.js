import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/ComponentsForLogin/Login";
import AllTask from "./components/ComponentsForTaskTab/AllTask";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />

        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<AllTask />} />

            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
