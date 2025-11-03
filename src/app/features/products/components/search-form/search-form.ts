import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  imports: [FormsModule],// FormsModule est obligatoir pour ngModule
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss'
})
export class SearchForm {
  searchTerm : string = '';
  description : string = '';
  category : string = '';
}
