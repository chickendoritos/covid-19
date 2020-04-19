import React, { useEffect } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { SelectCounties } from '../selectCounties';
import { ConfirmedCases } from '../confirmed_cases';
import './App.css';
import { load_cases } from '../confirmed_cases/reducer';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    const query_params = qs.parse(location.search);
    let selected_counties = [];
    if (query_params.counties) {
        selected_counties = query_params.counties.split(',');
    }
    dispatch(load_cases(selected_counties));
  }, []);

  return (
    <div id="app" className="App">
      <header className="App-header">
        Covid-19 Display
      </header>
      <div className='data-display'>
        <SelectCounties />
        </div>
      <div className='cases-display'>
        <ConfirmedCases />
      </div>
      <footer>
        <p>
          Data Source: <a href='https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/' target='_blank' rel='noopener noreferrer'>USAFacts</a>
        </p>
        <p>
          Contact: Made by Kyle Dufrene nolakpd@gmail.com
        </p>
      </footer>
    </div>
  );
}

export default App;
