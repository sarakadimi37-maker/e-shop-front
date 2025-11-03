import { Component } from '@angular/core';
import {ImageGallery} from '../../features/products/components/image-gallery/image-gallery';

@Component({
  selector: 'app-about.page',
  imports: [
    ImageGallery
  ],
  template: `
    <p>------  Affichage de composant User list  -------</p>
    <app-image-gallery></app-image-gallery>
  `,
  styles: ``
})
export default class AboutPage {

}
