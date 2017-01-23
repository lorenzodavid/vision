/*global console */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import promise from 'redux-promise-middleware';
const loggerMiddleware = createLogger();

const middleware = applyMiddleware(promise(), thunkMiddleware, loggerMiddleware);
const store = createStore(reducers, {}, middleware);
// store.dispatch({type: 'LOGIN'}, {});

store.subscribe(() => {
  console.log('store changed', store.getState());
});
export default store;
