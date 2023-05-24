import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Director } from '../interfaces/director';

@Injectable({
  providedIn: 'root',
})
export class DirectorsService {
  constructor(private httpClient: HttpClient) {}

  getDirectors() {
    return this.httpClient.get<Director[]>(
      'https://localhost:7200/api/director'
    );
  }
}
