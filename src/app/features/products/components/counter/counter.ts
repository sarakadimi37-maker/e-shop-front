import {Component, signal} from '@angular/core';
import {getCurrentInjector} from '@angular/core/primitives/di';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  count = signal(0); // ===> Création de signal la nouvelle façon
  inputCurrentValu : string = '';

  increment():void{
    this.count.update(inputCurrentValu  => inputCurrentValu + 1);
  }

  decrement():void{
    this.count.update(inputCurrentValu  => inputCurrentValu - 1);
  }
  reset():void{
    this.count.set(0);
  }

  onKeyUp(event: KeyboardEvent){
    this.inputCurrentValu = (event.target as HTMLInputElement).value;
  }

}
