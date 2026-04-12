import {FormControl, FormGroup} from '@angular/forms';

export type ProductFormModel = {
  name: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number>;
  quantity: FormControl<number>;
  discount: FormControl<number>;
  image: FormControl<string>;
  status: FormControl<string>;
  promotionStartDate: FormControl<Date>;
  promotionEndDate: FormControl<Date>;

}
