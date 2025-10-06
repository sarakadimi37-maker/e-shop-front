import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss'
})
export class ImageGallery {
  currentImage: string = 'https://placecats.com/neo/300/200';
  imageDescription : string = 'Image de démonstration';
  isLoading : boolean = false;
  isSelected: boolean = true;
  searchTerm: string = '';
  placeholderText : string = 'Rechercher une image ...';

}
