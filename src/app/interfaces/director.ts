import { FormControl } from '@angular/forms';

export interface Director {
  id?: number;
  name: string;
  nationality: string;
  age: number;
  active: boolean;
}

export interface DirectorForm {
  name: FormControl<string>;
  nationality: FormControl<string>;
  age: FormControl<number>;
  active: FormControl<boolean>;
}
