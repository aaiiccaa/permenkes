import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css';

export default function GuestLayout() {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <div id="defaultLayout">
            <nav>
                <ul>
                    <li>
                        <Link 
                            to="/simulasi" 
                            className={activePath === "/simulasi" ? "active" : ""}
                        >
                            Simulasi
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/search" 
                            className={activePath === "/search" ? "active" : ""}
                        >
                            Search Tool
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                    <Link 
                            to="/login" 
                            className={activePath === "/login" ? "active" : ""}
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
