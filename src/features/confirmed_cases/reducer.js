import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import csv from 'csvtojson';

export const confirmedCasesReducer = createSlice({
  name: 'confirmed_cases',
  initialState: {
    val: 1,
    cases: [],
    counties: [],
    selectedCounties: [],
    selectedCases: []
  },
  reducers: {
    set_cases: (state, action) => {
      state.cases = action.payload;
    },
    select_county: (state, { payload: county_id }) => {
      const found_county = state.cases.find(x => x.countyFIPS === county_id);
      const copy_county = { ...found_county, name: found_county['County Name'] };

      delete copy_county.countyFIPS;
      delete copy_county.stateFIPS;
      delete copy_county.State;
      delete copy_county['County Name'];

      state.selectedCounties = [...state.selectedCounties, county_id];
      state.selectedCases = [...state.selectedCases, copy_county];
    },
    remove_county: (county_id, state) => {
      //state.selectedCounties = [...state.selectedCounties, county_id];
    }
  },
});

export const { set_cases, select_county, remove_county } = confirmedCasesReducer.actions;

export const load_cases =  () => async dispatch => {
  const csvFilePath = 'https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv';
  const response = await axios.get(csvFilePath);
  csv({
    output: "json"
    })
    .fromString(response.data)
    .then((jsonObj)=>{
      console.log('jsonObj', jsonObj);
      dispatch(set_cases(jsonObj));
    })
};

// SELECTORS
export const selectCases = state => state.confirmed_cases.cases;
export const selectSelectedCases = state => state.confirmed_cases.selectedCases;
export const selectSelectedCounties = state => state.confirmed_cases.selectedCounties;

export default confirmedCasesReducer.reducer;
