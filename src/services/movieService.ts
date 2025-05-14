import { API_BASE_URL, API_KEY } from '../utils/constants';
import { Movie, MovieDetails, Review } from '../types';

async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });
  
  const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  
  return response.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/trending/movie/week');
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/popular');
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/top_rated');
  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/movie/upcoming');
  return data.results;
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const data = await fetchData<{ results: Movie[] }>('/discover/movie', {
    with_genres: genreId.toString()
  });
  return data.results;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchData<MovieDetails>(`/movie/${movieId}`, {
    append_to_response: 'videos,credits,similar'
  });
}

export async function getMovieReviews(movieId: number): Promise<Review[]> {
  const data = await fetchData<{ results: Review[] }>(`/movie/${movieId}/reviews`);
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  
  const data = await fetchData<{ results: Movie[] }>('/search/movie', { query });
  return data.results;
}