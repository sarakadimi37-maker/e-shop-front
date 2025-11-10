import {Component, input} from '@angular/core';
import {ConverterCategory} from '../../../../shared/utile/ConverterCategory';

@Component({
  selector: 'app-product-categories',
  imports: [],
  template: ` <span class="product-category">{{ConverterCategory.getFr(category()!)}}</span>
  `,
  styles: ``,
})
export class ProductCategories {
  category = input<string>();

  protected readonly ConverterCategory = ConverterCategory;
}
