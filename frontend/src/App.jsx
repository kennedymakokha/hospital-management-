/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
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
import { io } from "socket.io-client";
import ProtectedRoute from "./pages/privateRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {initializeApp} from 'firebase/app'
import { getToken, getMessaging } from "firebase/messaging";
// import { messaging } /zfrom "./firebase/firebaseConfig";
import Message from "./container/Message";

const { VITE_APP_VAPID_KEY } = import.meta.env;
const App = () => {
  // const socket = io(`https://localhost:5000`);

  let routes = <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Dashboard />} />
      {/* <Route exact path='/forgot_password' element={<Recover />} /> */}
      <Route exact path='/profile' element={<ProtectedRoute >
        <Profile />
      </ProtectedRoute>} />
      <Route exact path='/patients' element={<ProtectedRoute >
        <Patients />
      </ProtectedRoute>} />
      <Route exact path='/appointments' element={<ProtectedRoute >
        <Appointment />
      </ProtectedRoute>} />
      <Route exact path='/patients/:name' element={<ProtectedRoute >
        <PatientDetails />
      </ProtectedRoute>} />
      <Route exact path='/triage' element={<ProtectedRoute >
        <Triage />
      </ProtectedRoute>} />
      <Route exact path='/lab' element={<ProtectedRoute >
        <Lab />
      </ProtectedRoute>} />
      {/* <Route exact path='/wallet' element={<WalletPage />} /> */}

    </Routes>

  </BrowserRouter>

  return routes;
};
async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    initializeApp({
      apiKey: import.meta.env.VITE_APP_API_KEY,
      authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_APP_PROJECT_ID,
      storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_APP_ID,
      measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
    })
    const messaging = getMessaging()
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}




const AppWrapper = ({ riders, setRiders }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  // onMessage(messaging, (payload) => {
  //   toast(<Message notification={payload.notification} />);
  // });
  return (
    <div>

      <ToastContainer />
      <App />
    </div>
  );
};


export default AppWrapper
