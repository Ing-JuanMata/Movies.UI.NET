import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Director } from '../interfaces/director';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css'],
})
export class DirectorsComponent {
  directors: Director[] = [];
  director: Director = {
    Active: false,
    Age: 0,
    Name: '',
    Nationality: 'MX',
  };
  constructor(public router: Router) {
    console.log(router.url);
  }

  saveDirector() {}
  updateDirector() {}
  deleteDirector() {}
}
