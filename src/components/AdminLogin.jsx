import React, {useState} from "react";
import Axios from "axios";
import {domain} from "../env";

const AdminLogin = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const loginrequest = async() => {
        await Axios({
            method: "post",
            url: `${domain}/api/admin_login/`,
            data:{
                'username':username,
                'password':password
            }
        }).then(response => {
            console.log(response.data['message']);
            window.localStorage.setItem("admin_token", response.data['admin_token'])
            let value = response.data['message']
            if (value === true){
                window.location.href = '/filter_results'
            }
            else {
                alert("You are not a valid user !! ")
            }

        }).catch(_=>{
            alert("Your username or password is incorrect !! Try Again ....")
        })
    }
    return (
        <div className="container mt-4 col-md-4">
            <h1>Admin Login Panel</h1>
            <div className="form-group">
                <label >Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control"  placeholder="Username" />
            </div>
            <div className="form-group">
                <label >Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"  placeholder="Password" />
            </div>
            <button onClick={loginrequest} className="btn btn-success my-2">Login</button>
        </div>
    )
}

export default AdminLogin