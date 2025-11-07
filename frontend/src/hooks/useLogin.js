import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const loginUser = async (username, password) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("placementUser", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Logged in successfully!");
            return data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
            navigate("/")
        }
    };

    return { loading, loginUser };
};

export default useLogin;