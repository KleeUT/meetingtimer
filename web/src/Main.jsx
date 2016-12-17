import { createStore } from 'redux';
import { Provider } from 'react-redux';
import resucers from './reducers.js';
import ContainerView from './ContainerView.jsx';
import ReactDOM from 'react-dom';
import React from 'react';
import StopWatch from './background/StopWatch.js';

let store = createStore(resucers);

const stopWatch = new StopWatch(store);

stopWatch.start;

ReactDOM.render(
    <Provider store={store}>
      <ContainerView />
    </Provider>,
    document.getElementById('main')
);
