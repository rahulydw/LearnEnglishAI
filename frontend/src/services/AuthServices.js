import api from "../config/api";

// Google Login
export const handleGoogleLogin = () => {
  const backend =
    import.meta.env.VITE_BACKEND_URL || "https://talkone.onrender.com";
  window.open(`${backend}/api/auth/google`, "_self");
};

// Check Auth
export const checkAuth = async () => {
  const response = api.get("/api/auth/login/success");
  return response;
};

// Get Latest Reviews 
export const LatestReviews = async () => {
  const response = api.get("/api/v1/landing-page/reviews-latest");
  return response;
}