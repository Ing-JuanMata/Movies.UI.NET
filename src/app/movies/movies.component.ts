import { Component, OnInit } from '@angular/core';
import { Movie, MovieForm } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  id?: number;
  director: number = 0;

  movieForm: FormGroup<MovieForm>;
  errorMessages: any;

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.movieForm = new FormGroup<MovieForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      release_Year: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      duration: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      gender: new FormControl('terror', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.errorMessages = {
      name: [{ type: 'required', message: 'Se requiere un nombre' }],
      release_Year: [
        { type: 'required', message: 'Se requiere un año de lanzamiento' },
      ],
      duration: [{ type: 'required', message: 'Se requiere una duración' }],
    };
  }

  ngOnInit() {
    this.director = this.activeRoute.snapshot.params['id'];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.director = this.activeRoute.snapshot.params['id'];
        this.getMovies();
      });
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies(this.director).subscribe((movies) => {
      this.movies = movies;
    });
  }

  saveMovie() {
    if (this.id) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }

  createMovie() {
    this.moviesService
      .saveMovie({
        ...this.movieForm.getRawValue(),
        id: this.id,
        director: this.director,
      })
      .subscribe((movie) => {
        this.movies.push(movie);
        this.movieForm.reset();
      });
  }
  updateMovie() {
    this.moviesService
      .updateMovie({
        ...this.movieForm.getRawValue(),
        id: this.id,
        director: this.director,
      })
      .subscribe((movie) => {
        const index = this.movies.findIndex((m) => m.id === this.id);
        this.movies[index] = movie;
        this.movieForm.reset();
        this.id = undefined;
      });
  }
  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      const index = this.movies.findIndex((m) => m.id === id);
      this.movies.splice(index, 1);
      this.movieForm.reset();
      this.id = undefined;
    });
  }
  setMovie(movie: Movie) {
    this.id = movie.id;
    movie.release_Year = movie.release_Year.split('T')[0];
    this.movieForm.patchValue(movie);
  }
}
