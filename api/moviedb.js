import axios from "axios";
import { apiKey, token } from '../constants';

// endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/all/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const currentSeriesEndpoint = `${apiBaseUrl}/tv/on_the_air?api_key=${apiKey}`;
const topRatedSeriesEndpoint = `${apiBaseUrl}/tv/top_rated?api_key=${apiKey}`;
const searchEndpoint = `${apiBaseUrl}/search/multi?api_key=${apiKey}`;

const accountDetails = `${apiBaseUrl}/account/20887741`;

// dynamic endpoints
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const seriesDetailsEndpoint = id=> `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;
const seriesCreditsEndpoint = id=> `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;
const similarSeriesEndpoint = id=> `${apiBaseUrl}/tv/${id}/similar?api_key=${apiKey}`;


const actorDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const actorMovieCreditsEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const actorTvCreditsEndpoint = id=> `${apiBaseUrl}/person/${id}/tv_credits?api_key=${apiKey}`;

export const imagew500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const imagew342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const imagew185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackPoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r_cd2YunvZ5iqRYvb4QJ312hlRGqDNnTRmLVuxRw7CDnH1yQLf6dKrCdJ-9dCrwukHI&usqp=CAU';
export const fallbackActorImage = 'https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch(error) {
        console.log('error: ', error);
        return {}
    }
}

// home screen fetch
export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchAiringSoonTv = () => {
    return apiCall(currentSeriesEndpoint);
}
export const fetchTopRatedSeries = () => {
    return apiCall(topRatedSeriesEndpoint);
}

// movie screen fetch
export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}


// series screen fetch
export const fetchSeriesDetails = id => {
    return apiCall(seriesDetailsEndpoint(id));
}
export const fetchSeriesCredits = id => {
    return apiCall(seriesCreditsEndpoint(id));
}
export const fetchSimilarSeries = id => {
    return apiCall(similarSeriesEndpoint(id));
}

// actor page fetch
export const fetchActorDetails = id => {
    return apiCall(actorDetailsEndpoint(id));
}
export const fetchActorMovieCredits = id => {
    return apiCall(actorMovieCreditsEndpoint(id));
}
export const fetchActorTvCredits = id => {
    return apiCall(actorTvCreditsEndpoint(id));
}


// search
export const searchMulti = params => {
    return apiCall(searchEndpoint, params);
}

export const fetchAccountDetails = () => {
    return apiCall(accountDetails);
}