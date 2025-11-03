import {FormControl} from '@angular/forms';

export type RateFormModel = {
  rate: FormControl<string>,
  comment: FormControl<string>,
}
