import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {CartStore} from '../../../features/cart/services/cart.store';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatIconModule,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  cartStore = inject(CartStore);

  isOpen: boolean = false;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
