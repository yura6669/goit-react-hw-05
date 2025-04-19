const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODc2NWNmNjM1ZGZjYWU0MGQ4MTJmNGFmZmFiN2VkMSIsIm5iZiI6MTc0NDkwMjA2NC45NTI5OTk4LCJzdWIiOiI2ODAxMTdiMDJlODk1OGYwZjk5OTQ2M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pX7wbM8HVZ0sRGq4chY9OT1tbfnrYajUDCWBdIhYds4';

export const getApiKey = () => { 
    return API_KEY;
}

export const getTrendingTodayFilms = () => {
    return `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
}

export const searchFilms = (query, page) => {
    return `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`;
}

export const getFilmDetails = (id) => { 
    return `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
}

export const getFilmCredits = (id) => { 
    return `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
}

export const getFilmReviews = (id, page) => {
    return `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=${page}`;
}