import {DevTools} from '../ui/DevTool'
import {createStore, compose, combineReducers} from 'redux';
import {booksReducer} from '../reducers/books';
import {uiReducer} from '../reducers/ui';
import {notificationsReducer} from '../reducers/notification';
import {actionSplitterMiddleware} from '../middleware/actionSplitter';
import {booksMiddleware} from '../middleware/books';
import {apiMiddleware} from '../middleware/api';
import {normalizeMiddleware} from '../middleware/normalize';
import {notificationMiddleware} from '../middleware/notification';
import {loggerMiddleware} from '../middleware/logger';
import {applyMiddleware} from 'redux';

// shape the state structure
const rootReducer = combineReducers({
  books: booksReducer,
  notification: notificationsReducer,
  ui: uiReducer,
});

// create the core middleware array
const coreMiddleware = [
  actionSplitterMiddleware,
  apiMiddleware,
  normalizeMiddleware,
  notificationMiddleware,
  loggerMiddleware,
];

// const create feature middleware array
const featureMiddleware = [
  booksMiddleware,
];

// compose the middleware with additional (optional) enhancers
// DevTools.instrument() will enable dev tools integration
const enhancer = compose(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
  DevTools.instrument()
);

export const store = createStore(rootReducer, {}, enhancer);
