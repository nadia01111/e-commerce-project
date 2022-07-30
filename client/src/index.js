import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ItemsDataProvider} from "./components/ItemsDataContext"
ReactDOM.render(
  <React.StrictMode>
    <ItemsDataProvider>
      <App />
    </ItemsDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
