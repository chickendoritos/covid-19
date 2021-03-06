import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedCases, selectCases } from './reducer';
import { Chart } from '../../components/chart';

export function ConfirmedCases() {
    const dispatch = useDispatch();
    const cases = useSelector(selectCases);

    const selectedCases = useSelector(selectSelectedCases);

    // if (cases.length > 0 && selectedCases.length === 0) {
    //     dispatch(select_county('22071_LA')); //22071 22069
    //     dispatch(select_county('22051_LA')); //22071 22069
    // }

    return (
        <>
            {selectedCases && selectedCases.length > 0 && <Chart name='confirmed_cases' data={selectedCases} />}
        </>
    );
}