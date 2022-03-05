import React from 'react';
import {Button} from "bootstrap";

const SearchResult = ({setObtained_value, id, value, description, category}) => {
    return (
        <div className="card text-white bg-success">
            <div className="card-header">Searched Word: {value}</div>
            <div className="card-body">
                <h5 className="card-title">Category: {category}</h5>
                <p className="card-text">Description: {description}</p>
            </div>
            <button className="btn btn-danger w-25 mx-auto" onClick={() => {setObtained_value(false)}}>Clear</button>
            <p></p>
        </div>
    );
};

export default SearchResult;
