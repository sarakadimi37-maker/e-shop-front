import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  count: number = 0;
  inputValu : string = '';

  increment():void{
    this.count++;
  }

  decrement():void{
    this.count--;
  }
  reset():void{
    this.count = 0;
  }

  onKeyUp(event: KeyboardEvent){
    this.inputValu = (event.target as HTMLInputElement).value;
  }

}
