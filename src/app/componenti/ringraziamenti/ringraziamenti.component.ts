import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var lottie: any;

@Component({
  selector: 'app-ringraziamenti',
  standalone: false,
  templateUrl: './ringraziamenti.component.html',
  styleUrl: './ringraziamenti.component.css',
})
export class RingraziamentiComponent {
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const ordineOk = nav?.extras.state?.['ordineOk'];

    if (!ordineOk) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    document.body.classList.add('no-scroll');

    lottie.loadAnimation({
      container: document.getElementById('animazione-pacco') as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/pacco.json',
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}
