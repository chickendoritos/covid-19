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
        <SelectCounties />
        <ConfirmedCases />
      </header>
    </div>
  );
}

export default App;
