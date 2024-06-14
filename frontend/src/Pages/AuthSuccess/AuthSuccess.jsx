import React, { useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useParams();
  const { GoogleAuthLogin } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      console.log(token);
      if (token) {
        try {
          const response =
            await GoogleAuthLogin(token.token);
          console.log(response);
        } catch (error) {
          console.error(error);
          toast.error(
            "Authentication failed! Please try again."
          );
          // Redirect or update UI accordingly
          navigate("/login");
        }
      } else {
        // Redirect to login if no token found
        toast.error(
          "No token found! Redirecting to login."
        );
        navigate("/login");
      }
    };

    authenticate();
  }, [navigate, location]);

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  );
};

export default AuthSuccess;
