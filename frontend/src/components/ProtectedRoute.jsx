import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/UserContextProvider";
import { checkAuth } from "../services/AuthServices";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const { setUser } = useContext(userContext);

  useEffect(() => {
    const check = async () => {
      console.log("🔍 ProtectedRoute: Auth check start...");

      try {
        const res = await checkAuth();
        console.log("✅ checkAuth() Response:", res);

        if (res.success) {
          console.log("✅ Authenticated User:", res.data);

          setUser(res.data);
          setIsAuth(true);

          console.log("✅ isAuth SET to TRUE");
        } else {
          console.log("❌ Not authenticated (res.success = false)");
          setIsAuth(false);
        }

      } catch (err) {
        console.log("❌ Auth check ERROR:", err);
        setIsAuth(false);
      }
    };

    check();
  }, []);

  console.log("🔁 Rendering ProtectedRoute — isAuth:", isAuth);

  if (isAuth === null) {
    console.log("⏳ Still checking authentication...");
    return <div>Loading...</div>;
  }

  if (isAuth) {
    console.log("✅ Access allowed → Rendering protected route");
    return <Outlet />;
  } else {
    console.log("⛔ Access denied → Redirecting to /");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
