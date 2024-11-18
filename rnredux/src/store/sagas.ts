import { all } from 'redux-saga/effects';
import homeSaga from '../containers/home/saga';

function* rootSaga() {
  yield all([
    homeSaga(),
  ]);
}

export default rootSaga;