import { FormControl } from '@angular/forms';

export interface Movie {
  id?: number;
  name: string;
  release_Year: string;
  gender: string;
  duration: string;
  director: number;
}

export interface MovieForm {
  name: FormControl<string>;
  release_Year: FormControl<string>;
  gender: FormControl<string>;
  duration: FormControl<string>;
}
