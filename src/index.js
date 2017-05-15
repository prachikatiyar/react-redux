import React from 'react';
import {render} from 'react-dom';
import sub,{add} from './helper.js';
//import App from './components/App/index.js';
import App from './App';
const elem=document.getElementById('app');
//const App1 = () => App
//console.log("App=="+App1);

render(<App />,elem);
