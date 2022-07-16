import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import taskReducer from './Redux/reducer';
import taskSaga from './Redux/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(taskReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(taskSaga);


export default store;