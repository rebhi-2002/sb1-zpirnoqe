import { GENRES, IMAGE_BASE_URL, POSTER_SIZES, BACKDROP_SIZES, PROFILE_SIZES } from './constants';

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatRuntime(minutes: number): string {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatVoteAverage(voteAverage: number): string {
  return voteAverage.toFixed(1);
}

export function getGenreNameById(genreId: number): string {
  const genre = GENRES.find(g => g.id === genreId);
  return genre ? genre.name : 'Unknown';
}

export function getGenreNamesFromIds(genreIds: number[]): string[] {
  return genreIds.map(id => getGenreNameById(id)).filter(name => name !== 'Unknown');
}

export function getPosterUrl(path: string | null, size = POSTER_SIZES.MEDIUM): string {
  if (!path) return '/images/no-poster.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = BACKDROP_SIZES.LARGE): string {
  if (!path) return '/images/no-backdrop.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(path: string | null, size = PROFILE_SIZES.MEDIUM): string {
  if (!path) return '/images/no-profile.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getYearFromDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
}