import {Component, input} from '@angular/core';

@Component({
  selector: 'app-product-categories',
  imports: [],
  template: `
    @switch (category()) {
      @case ('gaming') {
        <span class="product-category">🎮 Jeux vidéo</span>
      }
      @case ('clothing') {
        <span class="product-category">👕 Mode</span>
      }
      @case ('home') {
        <span class="product-category">🏠 Maison</span>
      }
      @case ('electronics') {
        <span class="product-category">📱 High-tech</span>
      }
      @case ('sports') {
        <span class="product-category">⚽ Sport</span>
      }
      @default {
        <span class="product-category">📦 Autre</span>
      }
    }

  `,
  styles: ``,
})
export class ProductCategories {
  category = input<string>();
}
