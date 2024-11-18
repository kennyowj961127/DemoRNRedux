// actions.ts
import * as types from './types';
import {createAction, createAsyncAction} from 'typesafe-actions';

export const fetchPopularMoviesAsync = createAsyncAction(
  [types.FETCH_POPULAR_MOVIES_REQUEST, (page: number) => page],
  [types.FETCH_POPULAR_MOVIES_SUCCESS, (data: types.ApiResponse) => data],
  [types.FETCH_POPULAR_MOVIES_FAILED, (error: types.ApiError) => error],
  [types.FETCH_POPULAR_MOVIES_CANCEL, () => {}],
)<number, types.ApiResponse, types.ApiError>();

export const fetchUpcomingMoviesAsync = createAsyncAction(
  [types.FETCH_UPCOMING_MOVIES_REQUEST, (page: number) => page],
  [types.FETCH_UPCOMING_MOVIES_SUCCESS, (data: types.ApiResponse) => data],
  [types.FETCH_UPCOMING_MOVIES_FAILED, (error: types.ApiError) => error],
  [types.FETCH_UPCOMING_MOVIES_CANCEL, () => {}],
)<number, types.ApiResponse, types.ApiError>();

export const fetchDetailsMovieAsync = createAsyncAction(
  [types.FETCH_DETAILS_MOVIE_REQUEST, (movieId: string) => movieId],
  [types.FETCH_DETAILS_MOVIE_SUCCESS, (data: types.Movie) => data],
  [types.FETCH_DETAILS_MOVIE_FAILED, (error: types.ApiError) => error],
  [types.FETCH_DETAILS_MOVIE_CANCEL, () => {}],
)<string, types.Movie, types.ApiError>();

export const clearMovieDetails = createAction(types.CLEAR_MOVIE_DETAILS)<void>();

export const addFavouriteMovie = createAction(
  types.ADD_FAVOURITE_MOVIE,
  (movie: types.Movie) => movie,
)<types.Movie>();

export const removeFavouriteMovie = createAction(
  types.REMOVE_FAVOURITE_MOVIE,
  (movieId: number) => movieId,
)<number>();

export const resetFavouriteMovies = createAction(types.RESET_FAVOURITE_MOVIE)<void>();

export const clearErrors = createAction(types.CLEAR_ERRORS)<void>();

export const setIsNetworkConnected = createAction(
    types.SET_IS_NETWORK_CONNECTED,
    (isConnected: boolean) => isConnected,
    )<boolean>();