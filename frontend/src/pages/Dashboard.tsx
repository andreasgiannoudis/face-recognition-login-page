import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

    const [user, setUser] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://127.0.0.1:8000/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            setUser(res.data.user);
        })
        .catch(() => {
            localStorage.removeItem("token");
            window.location.href="/";
        });

    }, []);

    return (

        <div className="dashboard">

            <h1>Welcome {user}</h1>

            <p>You successfully logged in using Face Authentication.</p>

        </div>

    );

}