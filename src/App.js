import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import NewsTable from './components/NewsTable';

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <div className="App">
    <NewsTable url="https://api.hnpwa.com/v0/newest/" />
  </div>
);

export default hot(App);
