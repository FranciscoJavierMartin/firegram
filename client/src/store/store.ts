import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middlewares: any[] = [thunk];
let customCompose: any = compose;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  customCompose = composeWithDevTools;
}

export const store = createStore(
  rootReducer,
  customCompose(applyMiddleware(...middlewares))
);
