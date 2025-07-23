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
        const res = await axios.get("/api/auth/login/success", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAuth(res.data.success);
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
