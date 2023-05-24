import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = {
    director: 0,
    duration: '',
    gender: 'terror',
    name: '',
    release_Year: new Date(),
  };
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
  saveMovie() {}
  updateMovie() {}
  deleteMovie(id: number) {}
  getMovie(id: number) {}
}
