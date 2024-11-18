// index.ts
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { combinedReducers } from './reducers';
import rootSaga from './sagas';
import { persistStore } from 'redux-persist'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = createStore(combinedReducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);