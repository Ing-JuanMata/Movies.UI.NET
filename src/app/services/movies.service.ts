import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  getMovies(id:number) {
    return this.httpClient.get<Movie[]>(`https://localhost:7200/api/movies/${id}`);
  }

  saveMovie(movie: Movie) {
    return this.httpClient.post<Movie>(
      'https://localhost:7200/api/movies',
      movie
    );
  }

  updateMovie(movie: Movie) {
    return this.httpClient.put<Movie>(
      `https://localhost:7200/api/movies/${movie.id}`,
      movie
    );
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`https://localhost:7200/api/movies/${id}`);
  }
}
