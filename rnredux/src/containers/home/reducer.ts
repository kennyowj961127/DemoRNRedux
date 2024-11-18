import * as types from './types';
import { IAction } from  '../../interfaces/store';

interface IState {
  isNetworkConnected: boolean;
  popularLoading: boolean;
  upcomingLoading: boolean;
  detailLoading: boolean;

  popularError: types.ApiError | null;
  upcomingError: types.ApiError | null;
  detailError: types.ApiError | null;

  popularMovies: types.Movie[];
  upcomingMovies: types.Movie[];
  favouriteMovies: types.Movie[];
  detailMovie: types.Movie | null;
}

const initialState: IState = {
  isNetworkConnected: false,
  popularLoading: false,
  upcomingLoading: false,
  detailLoading: false,

  popularError: null,
  upcomingError: null,
  detailError: null,
  
  upcomingMovies: [],
  popularMovies: [],
  favouriteMovies: [],
  detailMovie: null,
};

const homeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.FETCH_POPULAR_MOVIES_REQUEST: {
      return {
        ...state,
        popularLoading: true,
      };
    }
    case types.FETCH_POPULAR_MOVIES_SUCCESS: {
      return {
        ...state,
        popularLoading: false,
        popularMovies: action.payload.results,
      };
    }
    case types.FETCH_POPULAR_MOVIES_FAILED: {
      return {
        ...state,
        popularLoading: false,
        popularError: action.payload,
      };
    }
    case types.FETCH_POPULAR_MOVIES_CANCEL: {
      return {
        ...state,
        popularLoading: false,
      };
    }
    case types.FETCH_UPCOMING_MOVIES_REQUEST: {
      return {
        ...state,
        upcomingLoading: true,
      };
    }
    case types.FETCH_UPCOMING_MOVIES_SUCCESS: {
      return {
        ...state,
        upcomingLoading: false,
        upcomingMovies: action.payload.results,
      };
    }
    case types.FETCH_UPCOMING_MOVIES_FAILED: {
      return {
        ...state,
        upcomingLoading: false,
        upcomingError: action.payload,
      };
    }
    case types.FETCH_UPCOMING_MOVIES_CANCEL: {
      return {
        ...state,
        upcomingLoading: false,
      };
    }
    case types.FETCH_DETAILS_MOVIE_REQUEST: {
      return {
        ...state,
        detailLoading: true,
      };
    }
    case types.FETCH_DETAILS_MOVIE_SUCCESS: {
      return {
        ...state,
        detailLoading: false,
        detailMovie: action.payload,
      };
    }
    case types.FETCH_DETAILS_MOVIE_FAILED: {
      return {
        ...state,
        detailLoading: false,
        detailError: action.payload,
      };
    }
    case types.FETCH_DETAILS_MOVIE_CANCEL: {
      return {
        ...state,
        detailLoading: false,
      };
    }
    case types.CLEAR_MOVIE_DETAILS: {
      return {
        ...state,
        detailMovie: null,
      };
    }
    case types.ADD_FAVOURITE_MOVIE: {
      return {
        ...state,
        favouriteMovies: [...state.favouriteMovies, action.payload],
      };
    }
    case types.REMOVE_FAVOURITE_MOVIE: {
      return {
        ...state,
        favouriteMovies: state.favouriteMovies.filter(
          (movie) => movie.id !== action.payload.id,
        ),
      };
    }
    case types.RESET_FAVOURITE_MOVIE: {
      return {
        ...state,
        favouriteMovies: [],
      };
    }
    case types.CLEAR_ERRORS: {
      return {
        ...state,
        popularError: null,
        upcomingError: null,
        detailError: null,
      };
    }
    case types.SET_IS_NETWORK_CONNECTED: {
      return {
        ...state,
        isNetworkConnected: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;