import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../models/User-model';
import {firstValueFrom} from 'rxjs';

export interface Post {
  userId: number;
  id:     number;
  title:  string;
  body:   string;
}


@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})

export class UserDetail {
  private http = inject(HttpClient);

  user = signal<User>({id:0,
    name: '',
    email: '',
    username: '',
    phone: '',
    website: ''});
  posts = signal<Post[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    //this.loadUserDetails();
    console.log('this.user ==>', this.user);
    console.log('user ==>', this.user());
  }

  async loadUserDetails(userId: number) {
    try {
      this.isLoading.set(true);

      // Appels parallèles avec Promise.all
      const [user, posts] = await Promise.all([
        firstValueFrom(this.http.get<User>(`/users/${userId}`)),
        firstValueFrom(this.http.get<Post[]>(`/users/${userId}/posts`))
      ]);
      // mise à jour des signaux respectifs
      this.user.set(user);
      console.log('this.user ==>', this.user);
      console.log('user ==>', user);

      this.posts.set(posts);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  async deletePost(postId: number) {
    try {
      await firstValueFrom(this.http.delete(`/posts/${postId}`));

      // Mise à jour du signal local
      this.posts.update(posts => posts.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  }
}
