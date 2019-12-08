import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middlewares: any[] = [];
let customCompose: any = compose;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  customCompose = composeWithDevTools;
}

export const store = createStore(
  rootReducer,
  customCompose(applyMiddleware(...middlewares))
);
