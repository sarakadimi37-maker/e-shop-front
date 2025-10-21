import {Component, inject, signal} from '@angular/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {Photo} from '../../../../models/galary-model';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss'
})
export class ImageGallery {
  private http = inject(HttpClient);

  photos = signal<Photo[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  counter : number = 0;

  ngOnInit() {
    this.loadPhotos();
  }
  async loadPhotos(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      const photos = await firstValueFrom(
        this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos?_limit=20')
      );
      this.photos.set(photos);
    }catch (error) {
      this.error.set('Erreur lors de chargement des photos');
      console.log('erreur de la api => ', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async refreshImages(): Promise<void> {
    await this.loadPhotos();
  }

  toggleLike(photoId : number) {
    // recuperer la liste des photos
    const listPhoto = this.photos();
    // chercher le objet photo qui a reçu le click c a d que la photo qui son id est passer dans paramettre
    const likedPhoto = listPhoto.find(photo => photo.id === photoId);
    //on verfie que l'objet photo exist
    if (likedPhoto !== undefined) {
      // verifier le like , s'il est liker je le délike, sinon iversse
      if (likedPhoto.liked) {
        likedPhoto.liked = false;
        this.counter--;
      }else {
        // j'increment le compteur si c'est like sinon je décrement le compteur
        likedPhoto.liked = true;
        this.counter++;
      }


    }

    console.log('counter ->', this.counter);
  }
}
