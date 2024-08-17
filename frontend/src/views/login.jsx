import { useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { useNavigate } from "react-router-dom";

export default function login(){

    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(false);

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login", payload).then(({ data }) => {
            setMessage(false);
            setUser(data.user);
            setToken(data.token);
            navigate('/simulasi');
        }).catch(err => {
            const response = err.response;
            if (response) {
                if (response.status === 401) {
                    setMessage(true); 
                } else if (response.status === 422) {
                    console.log(response.data.errors);
                }
            } else {
                console.log(err.message);
            }
        });
    }

    return (
        <div className="box-container">
            <h2>Login</h2>
            <form onSubmit={Submit}>
                <input ref={usernameRef} type="text" placeholder='username' />
                <input ref={passwordRef} type="password" placeholder='password' />
                {message && <p>Username atau password salah</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
