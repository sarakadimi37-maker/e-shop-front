import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../models/User-model';
import {firstValueFrom, single} from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {
  // injection de httpClient
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      // call vers http avec l'observable transformé observable
      const users = await firstValueFrom(
        this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      );
      this.users.set(users);
    }catch(err) {
      this.error.set('Erreur lors du chargement des utilisateurs');
      console.error('Erreur API:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  async refresh(){
    await this.loadUsers();
  }

}
