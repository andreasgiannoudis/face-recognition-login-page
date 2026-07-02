import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        
        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        axios
            .get("http://127.0.0.1:8000/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(() => {
                // Invalid or expired token
                localStorage.removeItem("token");
                navigate("/", { replace: true });
            });
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    if (loading) {
        return (
            <div className="dashboard loading">
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1>Welcome {user}</h1>

            <p>
                You successfully logged in using Face Authentication.
            </p>

            <button onClick={logout} className="logout-btn">
                Logout
            </button>
        </div>
    );
}