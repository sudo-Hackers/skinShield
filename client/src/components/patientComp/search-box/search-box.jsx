import React from 'react';
import './search-box.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBox = ({ placeholder, handleChange }) => {
    return (
        <div><input
            className='search'
            type='search'
            placeholder={placeholder}
            onChange={handleChange}
            style={{
                border:"none",
                borderBottom: "1px solid black"
            }}
        />
        </div>
    );
}