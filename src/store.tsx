import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { AuthState } from './redux/reducer/Reducer';
import rootSaga from './redux/middleware/Saga';
import authReducer from './redux/reducer/Reducer';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the saga middleware applied
// prettier-ignore
const store: Store<AuthState> = createStore(authReducer, applyMiddleware(sagaMiddleware));

// Run the root saga using the saga middleware
sagaMiddleware.run(rootSaga);

export default store;
