import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';
import * as cases_service from '../../services/cases';

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
      const { payload: { cases, counties } } = action;
      state.cases = cases;
      state.counties = counties;
    },
    set_counties: (state, { payload: selected_county_ids }) => {
      const selected_counties = [];
      const selected_cases = [];
      
      for (const county_id of selected_county_ids) {
        console.log('looping');
        const c = state.cases[county_id];
        selected_counties.push({ value: county_id, label: c['County Name'] });
        selected_cases.push(c);
      }

      //state = { ...state, selectedCounties: selected_counties, selectedCases: selected_cases};
      state.selectedCounties = selected_counties;
      state.selectedCases = selected_cases;
    }
  },
});

export const { set_cases, set_counties, remove_county } = confirmedCasesReducer.actions;

//MORE ACTIONS
export const load_cases = selected_counties => async dispatch => {
  const counties = [];
  const data = await cases_service.load_cases();
  const cases = data.reduce((obj, current) => {
    const key = `${current.countyFIPS}_${current.State}`; 
    counties.push({
      value: key,
      label: `${current['County Name']}, ${current.State}`
    });
    const result =  { ...obj };
    result[key] = { ...current };
    return result;
  }, {});
  
  dispatch(set_cases({ cases, counties }));
  dispatch(set_counties(selected_counties));
};

// SELECTORS
export const selectCounties = state => state.confirmed_cases.counties;
export const selectCases = state => state.confirmed_cases.cases;
export const selectSelectedCases = state => state.confirmed_cases.selectedCases;
export const selectSelectedCounties = state => state.confirmed_cases.selectedCounties;

export default confirmedCasesReducer.reducer;
