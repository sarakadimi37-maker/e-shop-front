import { Component } from '@angular/core';
import {Counter} from '../../products/components/counter/counter';
import {Temperature} from '../../products/components/temperature/temperature';
import {LikeCounter} from '../../products/components/like-counter/like-counter';
import {UserList} from '../../user/components/user-list/user-list';
import {ImageGallery} from '../../products/components/image-gallery/image-gallery';
import {UserDetail} from '../../user/components/user-detail/user-detail';

@Component({
  selector: 'app-home.page',
  imports: [
    Counter,
    Temperature,
    LikeCounter,
    UserList,
    UserDetail
  ],
  template: `
    <p>------  Affichage de composant Counter  -------</p>
    <app-counter></app-counter>
    <p>------  Affichage de composant Température  -------</p>
    <app-temperature></app-temperature>
    <p>------  Affichage de composant Like Counter  -------</p>
    <app-like-counter></app-like-counter>
    <p>------  Affichage de composant User list  -------</p>
    <app-user-list></app-user-list>
    <p>------  Affichage de composant User Detail  -------</p>

    <app-user-detail></app-user-detail>

  `,
  styles: ``
})
export class HomePage {

}
