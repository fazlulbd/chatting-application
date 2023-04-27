import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducer/index'
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(rootReducer,composeWithDevTools())


ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
