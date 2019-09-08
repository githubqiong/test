import React from 'react';
import ReactDOM from 'react-dom';
import DvaContainer from './dvaCon';
import router from './routers';
import './assets/index.less';

function render() {
  ReactDOM.render(React.createElement(
    DvaContainer,
    null,
    router
  ), document.getElementById('root'));
}
render();

// hot module replacement
if (module.hot) {
  module.hot.accept('./routers', () => {
    render();
  });
}