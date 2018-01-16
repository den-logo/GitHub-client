/* global $ */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

window.onload = function(){
  $("#user-name-input").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#search-button").click();
      }
  });
}
