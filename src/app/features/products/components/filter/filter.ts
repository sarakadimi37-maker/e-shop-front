import {Component, output} from '@angular/core';

export type CategoryType = {
  label: string,
  value: string,
};

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss'
})
export class Filter {

  categories : Array<CategoryType> = [
    {label: 'Mode', value: 'clothing'},
    {label: 'Game', value: 'gaming'},
    {label: 'Maison', value: 'home'},
    {label: 'Sport', value: 'sports'},
    {label: 'Electronique', value: 'electronics'}
     ];
  chosenCategory = output<string>();

  resetFilter() {
    this.chosenCategory.emit('ALL')
  }

  selectedCategory(category: string) {
    console.log('cat from enfant to parent ->: ' + category);
    this.chosenCategory.emit(category);
  }
}
