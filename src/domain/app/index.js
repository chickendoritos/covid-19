import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectCounties } from '../selectCounties';
import { ConfirmedCases } from '../confirmed_cases';
import './App.css';
import { load_cases } from '../confirmed_cases/reducer';

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
