import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import ChatData from './service/chat_data';

const chatData = new ChatData();

ReactDOM.render(
  <React.StrictMode>
    <App chatData={chatData} />
  </React.StrictMode>,
  document.getElementById('root')
);
