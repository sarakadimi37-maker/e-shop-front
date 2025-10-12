import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-temperature',
  imports: [
    FormsModule
  ],
  templateUrl: './temperature.html',
  styleUrl: './temperature.scss'
})
export class Temperature {
  celsiusInput = '';
  celsius = signal(20);

  fahrenheit = computed(()=>{
    return (this.celsius() * 9/5) + 32;
  });

  temperatureStatus = computed(()=>{
    const temp = this.celsius();
    if (temp < 0) return 'La température est Glacial !';
    if(temp < 10) return 'La température est Très froid !';
    if(temp < 20) return 'La température est Frais';
    if(temp < 30) return 'La température est Agréable';
    return 'Chaud !';
  });

  updateTemperature(){
    const value = parseFloat(this.celsiusInput);
    if (!isNaN(value)) {
      this.celsius.set(value);
    }
  }

}
