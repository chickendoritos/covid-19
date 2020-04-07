import React from 'react';
import { useDispatch } from 'react-redux';
import logo from './logo.svg';
import { SelectCounties } from './features/selectCounties';
import { ConfirmedCases } from './features/confirmed_cases';
import './App.css';
import { load_cases } from './features/confirmed_cases/reducer';

function App() {
  const dispatch = useDispatch();
  dispatch(load_cases());

  return (
    <div className="App">
      <header className="App-header">
        Covid-19 Display
      </header>
      <div className='data-display'>
        <SelectCounties />
        </div>
      <div className='data-display'>
        <ConfirmedCases />
      </div>
      <footer>
        Data Source: <a href='https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/' target='_blank' rel='noopener noreferrer'>USAFacts</a>
        Contact: Made by Kyle Dufrene nolakpd@gmail.com
      </footer>
    </div>
  );
}

export default App;
