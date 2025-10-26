import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {CartStore} from '../../../features/cart/services/cart.store';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatIconModule,
    NgClass,
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
