import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers.js';
import ContainerView from './ContainerView.jsx';
import ReactDOM from 'react-dom';
import React from 'react';
import StopWatch from './background/StopWatch.js';
import { Route } from 'react-router';

// router stuff
import createHistory from 'history/createHashHistory';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';

const router = routerReducer;
const history = createHistory();
const middleWare = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router
  }),
  applyMiddleware(middleWare)
);

const stopWatch = new StopWatch(store);
stopWatch.listen();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/">
          <ContainerView />
        </Route>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main')
);
