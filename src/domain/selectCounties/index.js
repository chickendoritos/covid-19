import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import {
    selectCounties, selectSelectedCounties, select_county
  } from '../confirmed_cases/reducer';

export function SelectCounties(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const counties = useSelector(selectCounties);
    const selectedCounties = useSelector(selectSelectedCounties);

    function onChange(selected_option) {
        const selected_county = selected_option[selected_option.length - 1];
        const counties_cloned = selectedCounties.map(x => x.value);
        counties_cloned.push(selected_county.value);
        const counties_string = counties_cloned.join(',');
        history.push(`?counties=${counties_string}`);
        dispatch(select_county(selected_county.value));
    }

    return (
        <>
            <h4>Search for any county in America!</h4>
            <p>
                Tip: Once you have selected some counties, bookmark to save your selections!
            </p>
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
        </>
    );
}