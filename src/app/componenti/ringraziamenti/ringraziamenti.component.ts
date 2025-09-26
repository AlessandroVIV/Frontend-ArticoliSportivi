import { Component } from '@angular/core';
declare var lottie: any;

@Component({
  selector: 'app-ringraziamenti',
  standalone: false,
  templateUrl: './ringraziamenti.component.html',
  styleUrl: './ringraziamenti.component.css',
})
export class RingraziamentiComponent {
  ngOnInit(): void {
    lottie.loadAnimation({
      container: document.getElementById('animazione-pacco') as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'animations/pacco.json',
    });
  }
}
