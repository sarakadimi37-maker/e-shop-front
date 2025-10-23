import { Component } from '@angular/core';
import {UserProfile} from '../../features/components/user/user-profile/user-profile';

@Component({
  selector: 'app-admin.page',
  imports: [
    UserProfile
  ],
  template: `
    <app-user-profile></app-user-profile>
  `,
  styles: ``
})
export default class AdminPage {

}
