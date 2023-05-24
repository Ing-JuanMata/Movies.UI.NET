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

  saveDirector(director: Director) {
    return this.httpClient.post<Director>(
      'https://localhost:7200/api/director',
      director
    );
  }

  updateDirector(director: Director) {
    return this.httpClient.put<Director>(
      `https://localhost:7200/api/director/${director.id}`,
      director
    );
  }

  deleteDirector(id: number) {
    return this.httpClient.delete(`https://localhost:7200/api/director/${id}`);
  }
}
