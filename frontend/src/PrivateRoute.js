import {Navigate } from 'react-router-dom'



export default function PrivateRoute({ children }) {
    let token = localStorage.getItem("AUTH_TOKEN");
    const isLoggedIn = token ? true : false;


  return isLoggedIn === true
    ? children
    : <Navigate to="/" replace />;
}