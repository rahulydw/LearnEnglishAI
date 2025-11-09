// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {userContext} from "@/context/UserContextProvider";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  // user Context Data set:
  const {setUser} = useContext(userContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/login/success", {
          withCredentials: true,
        });
        console.log(`data is:${response.data.user.name} , ${response.data.success}`)
        setUser(response.data.user);
        setIsAuth(response.data.success);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
