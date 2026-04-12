import { Component } from '@angular/core';
import {Admin} from '../../features/user/components/admin/admin';

@Component({
  selector: 'app-admin.page',
  imports: [
    Admin
  ],
  template: `
    <app-admin></app-admin>
  `,
  styles: ``
})
export default class AdminPage {

}
