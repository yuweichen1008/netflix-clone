const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  // Movies
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTrending:         `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated:         `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies:     `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies:     `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies:     `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies:    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries:    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchSciFiMovies:      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
  fetchKidsMovies:       `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10751&certification_country=US&certification.lte=G`,

  // TV Shows
  fetchTrendingTV:  `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTV:  `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchAnime:       `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja`,

  // Search
  fetchSearch: (query: string) =>
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`,
}

export default requests
