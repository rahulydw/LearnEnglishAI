// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/UserContextProvider";
import { checkAuth } from '../services/AuthServices';


const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const { setUser } = useContext(userContext);

  useEffect(() => {
    const AuthCheck = async () => {
      const res = await checkAuth();
      // console.log(`data is:${res.data.user.name} , ${res.data.success}`)
      if (res.success) {
        setUser(res.data);
        setIsAuth(res.success);
      }
      setIsAuth(false);
    };
    AuthCheck();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
