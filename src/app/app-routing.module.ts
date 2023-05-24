import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorsComponent } from './directors/directors.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {
    path: '',
    component: DirectorsComponent,
    children: [
      {
        path: ':id/movies',
        component: MoviesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
