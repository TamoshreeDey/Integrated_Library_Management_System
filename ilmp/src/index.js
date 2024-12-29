import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import Home from './components/Home';
//import BookReg from './components/BookReg';
//import MemberReg from './components/MemberReg';
import Front from './components/Front';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Front/>
     
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
