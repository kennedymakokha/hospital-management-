/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
// import { connect } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Dashboard from "./pages";
import 'react-toastify/dist/ReactToastify.css';
import Patients from "./pages/patients";
import Appointment from "./pages/appointments";
import PatientDetails from "./pages/patientDetails";
import Triage from "./pages/triage";
import Lab from "./pages/lab";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/profile";
;
import ProtectedRoute from "./pages/privateRoute";
const App = () => {

  let routes = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/patients", element: <Patients /> },
    { path: "/profile", element:<Profile /> },
   
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/appointments", element: <Appointment /> },
    { path: "/patients-details/:name", element: <PatientDetails /> },
    { path: "/triage", element: <Triage /> },
    { path: "/lab", element: <Lab /> },

    { element: <Dashboard /> },

  ]);
  return routes;
};
const AppWrapper = ({ riders, setRiders }) => {
  return (
    <Router>
      <ToastContainer />
      <App />
    </Router>
  );
};


export default AppWrapper
