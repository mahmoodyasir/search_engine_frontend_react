import React, {useState} from 'react';
import '../components/CSS/SearchBox.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {useGlobalState} from "../state/provider";
import SearchResult from "./SearchResult";
import Axios from "axios";
import {admin_header, adminToken, domain, header, userToken} from "../env";



const SearchBox = () => {
    const [{all_data}, dispatch] = useGlobalState()
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [obtained_value, setObtained_value] = useState(false);

    const [r_id, setR_id] = useState(null);
    const [r_value, setR_value] = useState(null);
    const [r_desc, setR_desc] = useState(null);
    const [r_cat, setR_cat] = useState(null);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = all_data.filter((value) => {
            return value.value.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
            setObtained_value(false)
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setObtained_value(false)
    };

    const setvalue = async (id, value, description, category) => {
        setWordEntered(value)
        console.log("$$$$$", id, " ", value, " ", description, " ", category)
        setObtained_value(true)
        setR_id(id)
        setR_value(value)
        setR_desc(description)
        setR_cat(category)

        let current_header
        if (userToken !== null) {
            current_header = header
        } else if (adminToken !== null) {
            current_header = admin_header
        }

        await Axios({
            method: "post",
            url: `${domain}/api/search_input/`,
            headers: current_header,
            data: {
                "s_id": id,
                "s_value": value,
            }
        }).then(response => {
            console.log(response.data)
        })

    }

    return (
        <div className="search">
            <h1 className="display-6 my-3 fw-bold">Search Engine</h1>
            <p className="text-white">You can only search country names</p>
            <button className="btn btn-danger logout_btn" onClick={() => {
                window.localStorage.clear();
                window.location.href = '/';
            }}>Logout
            </button>
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Type to search ....."
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon/>
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput}/>
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((item, i) => {
                        return (
                            <a key={i} type="button" className="dataItem"
                               onClick={() => setvalue(item?.id, item?.value, item?.description, item?.category)}>
                                <p>{item?.value} </p>
                            </a>
                        );
                    })}
                </div>
            )}
            <div className="result_bar">
                {obtained_value &&
                <SearchResult setObtained_value={setObtained_value} id={r_id} value={r_value} description={r_desc}
                              category={r_cat}/>}
            </div>
        </div>
    );
};

export default SearchBox;
