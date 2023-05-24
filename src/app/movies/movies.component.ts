import { Component } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies: Movie[] = [];
  movie: Movie = {
    Director: 0,
    Duration: '',
    Gender: 'terror',
    Name: '',
    Release_Year: new Date(),
  };
  constructor() {}

  saveMovie() {}
  updateMovie() {}
  deleteMovie() {}
  getMovie() {}
}
