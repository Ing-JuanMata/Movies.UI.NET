import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Director } from '../interfaces/director';
import { DirectorsService } from '../services/directors.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css'],
})
export class DirectorsComponent implements OnInit {
  directors: Director[] = [];
  director: Director = {
    active: false,
    age: 0,
    name: '',
    nationality: 'MX',
  };
  constructor(
    public router: Router,
    private directorsService: DirectorsService
  ) {
    this.director.id = +router.url.split('/')[1];
  }

  ngOnInit() {
    this.directorsService.getDirectors().subscribe((directors) => {
      console.log(directors);
      this.directors = directors;
    });
  }

  saveDirector() {}
  updateDirector() {}
  deleteDirector(id: number) {}
  setDirector(id: number) {
    this.director.id = id;
  }
}
