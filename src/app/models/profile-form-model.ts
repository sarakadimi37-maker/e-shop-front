import {FormArray, FormControl} from '@angular/forms';

export type ProfileFormModel = {
  username: FormControl<string>;
  email: FormControl<string>;
  password : FormControl<string>;
  confirmPassword: FormControl<string>;
  phone: FormControl<string>;
  addresses: FormArray<FormControl<string>>;

}
