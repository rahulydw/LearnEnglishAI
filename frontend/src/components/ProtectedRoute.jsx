import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/UserContextProvider";
import { checkAuth } from "../services/AuthServices";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const { setUser } = useContext(userContext);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkAuth();

        if (res.success) {
          setUser(res.data);
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    check();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
