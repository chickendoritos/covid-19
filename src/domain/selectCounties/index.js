import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import {
    selectCounties, selectSelectedCounties, select_county
  } from '../confirmed_cases/reducer';

export function SelectCounties() {
    const dispatch = useDispatch();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const counties = useSelector(selectCounties);
    const selectedCounties = useSelector(selectSelectedCounties);

    console.log("selectedCounties", selectedCounties);

    function onChange(selected_option) {
        console.log('selected_option', selected_option);
        dispatch(select_county(selected_option[selected_option.length - 1]));
    }

    return (
        <div>
            <h4>Search for any county!</h4>
            <Select 
                isMulti
                options={counties}
                value={selectedCounties}
                className='select-counties'
                onChange={onChange}
                menuIsOpen={menuIsOpen}
                onInputChange={(e) => {
                        setMenuIsOpen(e.length > 2);
                }}
            />
        </div>
    );
}