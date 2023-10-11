import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <h1>This is the profile page!</h1>;
};

export default Profile;
