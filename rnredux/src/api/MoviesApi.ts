import axios from "../lib/axios";
import { TMDB_API_KEY } from "@env"
const tmdbApiKeyHeaders = {
    'Authorization': `Bearer ${TMDB_API_KEY}`,
}

export const getPopularMovies = async (page: number) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        // console.log('getPopularMovies response', response.data);
        return response.data;
    } catch (error) {
        console.error('getPopularMovies error', error);
        throw error;
    }
}

export const getUpcomingMovies = async (page: number) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        // console.log('getUpcomingMovies response', response.data);
        return response.data;
    } catch (error) {
        console.error('getUpcomingMovies error', error);
        throw error;
    }
}

export const getMovieDetails = async (movieId: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: tmdbApiKeyHeaders
        });
        // console.log('getMovieDetails response', response.data);
        return response.data;

    } catch (error) {
        console.error('getMovieDetails error', error);
        throw error;
    }
}