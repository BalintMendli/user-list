import React, { ElementType } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { createGlobalStyle } from 'styled-components';
import App from './components/App';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Crimson+Text');
  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>,
  document.querySelector('#root'),
);
