import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Director, DirectorForm } from '../interfaces/director';
import { DirectorsService } from '../services/directors.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css'],
})
export class DirectorsComponent implements OnInit {
  directors: Director[] = [];
  id?: number;

  directorForm: FormGroup<DirectorForm>;
  errorMessages: any;

  constructor(
    public router: Router,
    private directorsService: DirectorsService
  ) {
    this.directorForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z\u00C0-\u00FF]+(\s[a-zA-Z\u00C0-\u00FF]+)*$/
          ),
        ],
      }),
      nationality: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      age: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(18)],
      }),
      active: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.errorMessages = {
      name: [
        { type: 'required', message: 'Se require un nombre' },
        { type: 'pattern', message: 'El nombre solo puede contener letras' },
      ],
      nationality: [
        { type: 'required', message: 'Se requiere elegir una nacionalidad' },
      ],
      age: [
        { type: 'required', message: 'Se requiere una edad' },
        { type: 'min', message: 'La edad mínima es 18 años' },
      ],
      active: [{ type: 'required', message: 'Se requiere elegir un estado' }],
    };
  }

  ngOnInit() {
    this.directorsService.getDirectors().subscribe((directors) => {
      this.directors = directors;
      const id = +this.router.url.split('/')[1];
      if (id) {
        const director = this.directors.find((d) => d.id === id);
        if (director) {
          this.id = director.id;
          this.directorForm.patchValue(director);
        }
      }
    });
  }

  saveDirector() {
    this.directorsService
      .saveDirector({ ...this.directorForm.getRawValue() })
      .subscribe((director) => {
        this.directors.push(director);
        this.directorForm.reset();
      });
  }

  updateDirector() {
    this.directorsService
      .updateDirector({ ...this.directorForm.getRawValue(), id: this.id })
      .subscribe((director) => {
        this.directors = this.directors.map((d) =>
          d.id === director.id ? director : d
        );
      });
  }

  deleteDirector(id: number) {
    this.directorsService.deleteDirector(id).subscribe((director) => {
      this.directors = this.directors.filter((d) => d.id !== id);
      this.router.navigateByUrl('');
    });
  }

  setDirector(director: Director) {
    this.id = director.id;
    this.directorForm.patchValue(director);
  }
}
