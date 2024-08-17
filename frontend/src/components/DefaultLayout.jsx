import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const {user, token, setUser, setToken} = useStateContext();
    const navigate = useNavigate();

    const onLogout =  (ev) =>{
        ev.preventDefault();
        if (!window.confirm("Apakah anda yakin ingin keluar?")) {
            return;
        }
        axiosClient.get('/logout')
        .then(({}) => {
            setUser(null)
            setToken(null)
            navigate('/simulasi')
        })
    }

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);  
            })
            .catch((error) => {
                console.error("Failed to fetch user data:", error);
            });
        }, []);

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
                    <li>
                        <Link 
                            to="/upload-data" 
                            className={activePath === "/upload-data" ? "active" : ""}
                        >
                            Upload File
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/users" 
                            className={activePath === "/users" ? "active" : ""}
                        >
                            Users
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="name">
                        {user ? user.name : "Loading..."}
                    </li>
                    <li>
                        <Link
                            onClick={onLogout}
                        >
                            Logout
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
