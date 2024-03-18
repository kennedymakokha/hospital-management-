/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Dashboard from "./pages";
import { Users as UserPermissions, Dashboard as DashboardPermisions,Pharmacist, appointments, accounts, consultation, triage, lab, patients } from './container/roles.json'
import 'react-toastify/dist/ReactToastify.css';
import Patients from "./pages/patients";
import Appointment from "./pages/appointments";
import PatientDetails from "./pages/patientDetails";
import Triage from "./pages/triage";
import Lab from "./pages/lab";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import Profile from "./pages/profile";
import { io } from "socket.io-client";
import ProtectedRoute from "./pages/privateRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import Message from "./container/Message";
import Button from "./container/Button";
import Users from "./pages/users";
import UnAnauth from "./pages/unauth";
import UserDetails from "./pages/userDetails";
import Roles from "./pages/roles";
import Pharmacy from "./pages/pharmacy";

const { VITE_APP_VAPID_KEY } = import.meta.env;
const App = () => {
  // const socket = io(`https://localhost:5000`);

  let routes = <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Dashboard roles={DashboardPermisions} />} />
      {/* <Route exact path='/forgot_password' element={<Recover />} /> */}
      <Route exact path='/profile' roles={DashboardPermisions} element={<ProtectedRoute >
        <Profile />
      </ProtectedRoute>} />
      <Route exact path='/patients' element={<ProtectedRoute roles={patients}  >
        <Patients />
      </ProtectedRoute>} />
      <Route exact path='/appointments' element={<ProtectedRoute roles={appointments} >
        <Appointment />
      </ProtectedRoute>} />
      <Route exact path='/users' element={<ProtectedRoute roles={UserPermissions} >
        <Users />
      </ProtectedRoute>} />
      <Route exact path='/patients/:name' element={<ProtectedRoute roles={patients}>
        <PatientDetails />
      </ProtectedRoute>} />
      <Route exact path='/user-roles' element={<ProtectedRoute roles={patients}>
        <Roles />
      </ProtectedRoute>} />
      <Route exact path='/pharmacy' element={<ProtectedRoute roles={Pharmacist}>
        <Pharmacy />
      </ProtectedRoute>} />
      <Route exact path='/users/:name' element={<ProtectedRoute roles={UserPermissions}>
        <UserDetails />
      </ProtectedRoute>} />
      <Route exact path='/triage' element={<ProtectedRoute roles={triage}>
        <Triage />
      </ProtectedRoute>} />
      <Route exact path='/lab' element={<ProtectedRoute roles={lab} >
        <Lab />
      </ProtectedRoute>} />
      <Route exact path='/403' element={
        <UnAnauth />
      } />
      {/* <Route exact path='/wallet' element={<WalletPage />} /> */}

    </Routes>

  </BrowserRouter>

  return routes;
};
async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    // console.log("Token generated : ", token);
    localStorage.setItem("token", token)
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}



const AppWrapper = ({ riders, setRiders }) => {
  useEffect(() => {
    requestPermission();
    onMessage(messaging, payload => {

      toast((t) => (
        <div className="w-[240px] h-[100px] flex flex-col">

          <div className="h-[70%]"> Custom and <b>bold</b></div>
          <div className="float-right h-[10%]">
            <Button title="Navigate" primary onClick={() => { toast.dismiss(t.id); window.location.replace(`${payload.data.url}`) }} />
          </div>

        </div >
      ));
      // toast(<Message notification={payload.notification} />)
    })
    // onMessage()
  }, []);

  // onMessage(messaging, (payload) => {
  //   toast(<Message notification={payload.notification} />);
  // });
  return (
    <div>

      <ToastContainer />
      <App />
      <Toaster />
    </div>
  );
};


export default AppWrapper
