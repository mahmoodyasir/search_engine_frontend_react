import React, {useState} from 'react';
import '../components/CSS/Home.css'
import {useGlobalState} from "../state/provider";
import Login from "./Login";
import Registration from "./Registration";
import AdminLogin from "./AdminLogin";
const Home = () => {
    const [login_state, setLogin_state] = useState(true);
    const [register_state, setRegister_state] = useState(false);
    const [admin_state, setAdmin_state] = useState(false);
    return (
        <div className="home">
            <h1>You must Login as an User to "Search" and Login as an Admin to filter search results</h1>
            <div className="col-md-10 actions">
                <button className="btn btn-success mx-2" onClick={() => {
                    setLogin_state(true);
                    setRegister_state(false);
                    setAdmin_state(false);
                }}>User Login</button>

                <button className="btn btn-info" onClick={() => {
                    setLogin_state(false);
                    setRegister_state(true);
                    setAdmin_state(false);
                }}>User Registration</button>

                <button className="btn btn-primary mx-2" onClick={() => {
                    setLogin_state(false);
                    setRegister_state(false);
                    setAdmin_state(true);
                }}>Admin Login</button>
            </div>
            <div className="col-md-8">
                {login_state && <Login/>}
            </div>

            <div className="col-md-8">
                {admin_state && <AdminLogin/>}
            </div>

            <div className="col-md-4 my-3">
                {register_state && <Registration setRegister_state={setRegister_state} setLogin_state={setLogin_state}/>}
            </div>
        </div>
    );
};

export default Home;
