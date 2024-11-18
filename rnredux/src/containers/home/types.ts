export const INCREASE_REQUEST = '[Home] Increase number request';
export const INCREASE_REQUEST_SUCCESS = '[Home] Increase number successfully';
export const INCREASE_REQUEST_FAILED = '[Home] Increase number failed';

export const FETCH_POPULAR_MOVIES_REQUEST = '[Home] Fetch popular movies request';
export const FETCH_POPULAR_MOVIES_SUCCESS = '[Home] Fetch popular movies successfully';
export const FETCH_POPULAR_MOVIES_FAILED = '[Home] Fetch popular movies failed';
export const FETCH_POPULAR_MOVIES_CANCEL = '[Home] Fetch popular movies cancel';

export const FETCH_UPCOMING_MOVIES_REQUEST = '[Home] Fetch upcoming movies request';
export const FETCH_UPCOMING_MOVIES_SUCCESS = '[Home] Fetch upcoming movies successfully';
export const FETCH_UPCOMING_MOVIES_FAILED = '[Home] Fetch upcoming movies failed';
export const FETCH_UPCOMING_MOVIES_CANCEL = '[Home] Fetch upcoming movies cancel';

export const FETCH_DETAILS_MOVIE_REQUEST = '[Home] Fetch details movie request';
export const FETCH_DETAILS_MOVIE_SUCCESS = '[Home] Fetch details movie successfully';
export const FETCH_DETAILS_MOVIE_FAILED = '[Home] Fetch details movie failed';
export const FETCH_DETAILS_MOVIE_CANCEL = '[Home] Fetch details movie cancel';

export const CLEAR_MOVIE_DETAILS = '[Home] Clear movie details';

export const ADD_FAVOURITE_MOVIE = '[Home] Add favourite movie';
export const REMOVE_FAVOURITE_MOVIE = '[Home] Remove favourite movie';
export const RESET_FAVOURITE_MOVIE = '[Home] Reset favourite movie';
export const CLEAR_ERRORS = '[Home] Clear errors';

export const SET_IS_NETWORK_CONNECTED = '[Home] Set is network connected';


export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum MovieType {
    popular = "popular",
    upcoming = "upcoming",
}

export interface ApiResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: Movie[];
}

export interface ApiError {
    code: number;
    message: string;
}
