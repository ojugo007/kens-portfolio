import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token);

        if (!exp) return false; 

        const currentTime = Date.now() / 1000; 
        return exp < currentTime;
    } catch (error) {
        return true;
    }
};

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;