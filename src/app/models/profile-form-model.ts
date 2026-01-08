import {FormArray, FormControl} from '@angular/forms';

export type ProfileFormModel = {
  lastName: FormControl<string>;
  firstName: FormControl<string>;
  email: FormControl<string>;
  password : FormControl<string>;
  confirmPassword: FormControl<string>;
  phone: FormControl<string>;
  streetAddress: FormControl<string>;
  city: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
  //addresses: FormArray<FormControl<string>>;
}
