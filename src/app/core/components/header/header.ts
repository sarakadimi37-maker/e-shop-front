import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatIconModule,
    NgClass
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  isOpen: boolean = false;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
