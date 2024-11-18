// saga.ts
import {
  put,
  takeLatest,
  delay,
  race,
  take,
  call,
  select,
} from 'redux-saga/effects';
import * as actions from './actions';
import {
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
} from '../../api/MoviesApi';

function* fetchPopularMoviesSaga({
  payload,
}: ReturnType<typeof actions.fetchPopularMoviesAsync.request>) {
  try {
    const isNetworkConnected = yield select(
      state => state.home.isNetworkConnected,
    );
    if (!isNetworkConnected) {
      yield put(
        actions.fetchPopularMoviesAsync.failure({
          error: 0,
          message: 'No internet connection',
        }),
      );
      return;
    }
    const {response} = yield race({
      response: call(getPopularMovies, payload),
      cancel: take(actions.fetchPopularMoviesAsync.cancel),
      failed: take(actions.fetchPopularMoviesAsync.failure),
      timeout: delay(3000),
    });
    if (response) {
      yield put(actions.fetchPopularMoviesAsync.success(response));
    }
  } catch (e) {
    // console.log('fetchPopularMovies error', e);
    yield put(actions.fetchPopularMoviesAsync.failure(e));
  }
}

function* fetchUpcomingMoviesSaga({
  payload,
}: ReturnType<typeof actions.fetchUpcomingMoviesAsync.request>) {
  try {
    const isNetworkConnected = yield select(
      state => state.home.isNetworkConnected,
    );
    if (!isNetworkConnected) {
      yield put(
        actions.fetchUpcomingMoviesAsync.failure({
          error: 0,
          message: 'No internet connection',
        }),
      );
      return;
    }
    const {response} = yield race({
      response: call(getUpcomingMovies, payload),
      cancel: take(actions.fetchUpcomingMoviesAsync.cancel),
      failed: take(actions.fetchUpcomingMoviesAsync.failure),
      timeout: delay(3000),
    });
    if (response) {
      yield put(actions.fetchUpcomingMoviesAsync.success(response));
    }
  } catch (e) {
    // console.log('fetchUpcomingMovies error', e);
    yield put(actions.fetchUpcomingMoviesAsync.failure(e));
  }
}

function* fetchMovieDetailsSaga({
  payload,
}: ReturnType<typeof actions.fetchDetailsMovieAsync.request>) {
  try {
    const isNetworkConnected = yield select(
      state => state.home.isNetworkConnected,
    );
    if (!isNetworkConnected) {
      yield put(
        actions.fetchDetailsMovieAsync.failure({
          error: 0,
          message: 'No internet connection',
        }),
      );
      return;
    }
    const {response} = yield race({
      response: call(getMovieDetails, payload),
      cancel: take(actions.fetchDetailsMovieAsync.cancel),
      failed: take(actions.fetchDetailsMovieAsync.failure),
      timeout: delay(3000),
    });
    if (response) {
      yield put(actions.fetchDetailsMovieAsync.success(response));
    }
    // console.log('fetchMovieDetails response', response);
  } catch (e) {
    // console.log('fetchMovieDetails error', e);
    yield put(actions.fetchDetailsMovieAsync.failure(e));
  }
}

export default function* homeSaga() {
  yield takeLatest(
    actions.fetchPopularMoviesAsync.request,
    fetchPopularMoviesSaga,
  );
  yield takeLatest(
    actions.fetchUpcomingMoviesAsync.request,
    fetchUpcomingMoviesSaga,
  );
  yield takeLatest(
    actions.fetchDetailsMovieAsync.request,
    fetchMovieDetailsSaga,
  );
}
