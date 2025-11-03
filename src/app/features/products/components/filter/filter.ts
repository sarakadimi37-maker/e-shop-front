import {Component, inject, OnInit, output} from '@angular/core';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

export type CategoryType = {
  label: string,
  value: string,
};

@Component({
  selector: 'app-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.scss'
})
export class Filter implements OnInit {
  ngOnInit(): void {
    this.categoriesForm.valueChanges.subscribe(event => {
      console.log(JSON.stringify(event));
      const filterCategory: string[] = [];
      for (let i = 0; i < event.categoriesArray!.length; i++) {
        if(event.categoriesArray![i] === true) {
          let cat = this.categories[i];
          filterCategory.push(cat.value);
        }
      }
      console.log('filterCategory : ' + filterCategory);
      this.chosenCategory.emit(filterCategory);
    })
  }
  categories : Array<CategoryType> = [
    {label: 'Mode', value: 'clothing'},
    {label: 'Jeux vidéo', value: 'gaming'},
    {label: 'Maison', value: 'home'},
    {label: 'Sport', value: 'sports'},
    {label: 'Electronique', value: 'electronics'}
  ];
  protected fb = inject(NonNullableFormBuilder);
  categoriesArray = this.fb.array(
    this.categories.map(category => {
      return this.fb.control(false)
    })
  );
  categoriesForm = this.fb.group({
    categoriesArray: this.categoriesArray
  });


  chosenCategory = output<string[]>();

  resetFilter() {
    this.chosenCategory.emit([]);
    this.categoriesArray.controls.forEach((control: FormControl) => {
      control.setValue(false);
    })
  }

  selectedCategory() {
    console.log('selected : ' + this.categoriesForm.value.categoriesArray);

    let category = 'clothing';
    console.log('cat from enfant to parent ->: ' + category);
    // this.chosenCategory.emit(category);
  }
}
