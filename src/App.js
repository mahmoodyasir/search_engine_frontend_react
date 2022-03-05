import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./components/Home";
import {useGlobalState} from "./state/provider";
import {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, adminToken, domain, header, userToken} from "./env";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AdminLogin from "./components/AdminLogin";
import FilterResults from "./components/FilterResults";

const App = () => {
    const [{profile, all_data, data}, dispatch] = useGlobalState()
    const [value, setValue] = useState(null);
    let current_header
    if (userToken !== null) {
        current_header = header
    } else if (adminToken !== null) {
        current_header = admin_header
    }

    useEffect(() => {
        const get_data = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/home/`,
                headers: current_header
            }).then(response => {
                dispatch({
                    type: "ALL_DATA",
                    all_data: response.data
                })
            })
        }
        get_data()
    }, [dispatch]);

    useEffect(() => {
        const fetch_data = async () => {
            await Axios ({
                method: "get",
                url: `${domain}/api/search_filter/`,
            }).then(response => {
                localStorage.setItem('f_obj', JSON.stringify(response.data))
                dispatch({
                    type: "FILTER_DATA",
                    data: response.data
                })
            })
        }
        fetch_data()
    }, [data, dispatch]);


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Registration}/>
                <Route exact path="/admin_login" component={AdminLogin}/>
                {
                    userToken !== null ? (
                        <>
                            <Route exact path="/searchbox" component={SearchBox}/>
                            <Route exact path="/searchresult" component={SearchResult}/>
                        </>
                    ) : ("")
                }

                {

                    adminToken !== null && userToken === null ? (
                        <>
                            <Route exact path="/searchresult" component={SearchResult}/>
                            <Route exact path="/filter_results" component={FilterResults}/>
                            <Route exact path="/searchbox" component={SearchBox}/>
                        </>

                    ) : ("")
                }

            </Switch>
        </BrowserRouter>
    );
}

export default App;
