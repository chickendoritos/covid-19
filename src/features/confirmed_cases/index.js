import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    select_county, remove_county, selectSelectedCases, selectSelectedCounties, selectCases
  } from './reducer';
import { Chart } from '../chart';

export function ConfirmedCases() {
    const dispatch = useDispatch();
    const cases = useSelector(selectCases);

    const selectedCases = useSelector(selectSelectedCases);
    const selectedCounties = useSelector(selectSelectedCounties);

    if (cases.length > 0 && selectedCases.length === 0) {
        dispatch(select_county('1001'));
    }

    console.log('selectedCounties length', selectedCounties);
    console.log('selectedCases length', selectedCases);
    return (
        <div>{selectedCases.map(x => <p key={x.countyFIPS}>{x.countyFIPS}</p>)} <Chart /></div>
    );
}