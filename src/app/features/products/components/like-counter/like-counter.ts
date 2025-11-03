import {Component, computed, effect, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-like-counter',
  imports: [
  ],
  templateUrl: './like-counter.html',
  styleUrl: './like-counter.scss'
})
export class LikeCounter implements OnInit {
  likes = signal(0);
  userName = signal('Utilisateur');

  likeMessage = computed(()=> {
    // pourquoi on range le signal like dans un autre const count ?????
    const count = this.likes();
    if(count === 0) return 'Aucun like';
    if (count === 1) return `1 personne aime`;
    return `${count} personnes aiment`;
  });
  constructor() {
    effect(() => {
      console.log(`${this.userName()} a ${this.likes()} likes`);
    });
  }

  isPopular =computed(() => this.likes() >= 10);

  ngOnInit() {

  }

  // Méthodes avec set()
  setUserName(name: string): void {
    this.userName.set(name);
  }

  resetLikes() {
    this.likes.set(0);
  }
  addLike() {
    this.likes.update(count => count +1);
  }
  removeLike() {
    this.likes.update(count => count > 0 ? count - 1 : 0);
  }

}
