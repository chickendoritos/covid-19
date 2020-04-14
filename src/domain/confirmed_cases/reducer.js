import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import lodash from 'lodash';
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
      const { payload: cases } = action;
      state.cases = cases;

      const counties = [];
      // Gather counties
      for (const c of cases) {
        counties.push({
          value: `${c.countyFIPS}_${c.State}`,
          label: `${c['County Name']}, ${c.State}`
        });
      }

      state.counties = counties;
    },
    select_county: (state, { payload: selected_county_id }) => {
      console.log('selected_county_id', selected_county_id);
      const found_case = state.cases.find(x => `${x.countyFIPS}_${x.State}` === selected_county_id);
      const v = { value: selected_county_id, label: found_case['County Name'] };
      state.selectedCounties = [...state.selectedCounties, v];
      state.selectedCases = [...state.selectedCases, found_case];
    },
    remove_county: (county_name, state) => {
      const cloned_s_cases = lodash.cloneDeep(state.selectedCases);
      state.selectedCases = lodash.remove(cloned_s_cases, (c) => {
        return c.name === county_name
      });

      const cloned_s_counties = lodash.cloneDeep(state.selectedCounties);
      state.selectedCounties = lodash.remove(cloned_s_counties, (c) => {
        return c === county_name
      })
    }
  },
});

export const { set_cases, select_county, remove_county } = confirmedCasesReducer.actions;

//MORE ACTIONS
export const load_cases = selected_counties => async dispatch => {
  const csvFilePath = 'https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv';
  const response = await axios.get(csvFilePath);
  csv({
    output: "json"
    })
    .fromString(response.data)
    .then((jsonObj)=>{
      dispatch(set_cases(jsonObj));
      for (const county of selected_counties) {
        dispatch(select_county(county));
      }
    })
};

// SELECTORS
export const selectCounties = state => state.confirmed_cases.counties;
export const selectCases = state => state.confirmed_cases.cases;
export const selectSelectedCases = state => state.confirmed_cases.selectedCases;
export const selectSelectedCounties = state => state.confirmed_cases.selectedCounties;

export default confirmedCasesReducer.reducer;
