import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <input 
            className='form-control m-2'
            type="text"
            name='query'
            placeholder='Search...'
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
    );
}
 
export default SearchBox;