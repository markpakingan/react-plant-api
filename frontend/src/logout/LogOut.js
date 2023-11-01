import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage and perform any additional logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Redirect the user to the home page after logout
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>; // You can show a loading message if needed
};

export default Logout;
