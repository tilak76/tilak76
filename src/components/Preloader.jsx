import React, { useEffect, useState } from "react";
import "./../styles/Preloader.css";

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2200); // Faster duration (2.2s)

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="preloader">
            <div className="loader-content">
                <h1 className="loader-title">Tilak Mishra</h1>
                <p className="loader-subtitle">Portfolio Loading...</p>
                <div className="loader-line"></div>
            </div>
        </div>
    );
};

export default Preloader;
