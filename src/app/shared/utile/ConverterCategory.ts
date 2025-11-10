import {categories} from '../../features/products/components/filter/filter';

export class ConverterCategory {
  public static getFr(value: string): string {
     let category = categories.find(category => category.value === value);
     if(category === undefined) {
       return '';
     }else{
       return category.label;
     }
  }
}
