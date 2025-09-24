import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  banners = [
    { image: '/images/banner1.jpeg', title: 'Nuova collezione running' },
    { image: '/images/banner2.jpg', title: 'Attrezzatura palestra -30%' },
    { image: '/images/banner3.jpg', title: 'Sport outdoor' }
  ];

  categories = [
    { name: 'Running', image: '/images/running.png' },
    { name: 'Calcio', image: '/images/calcio.png' },
    { name: 'Palestra', image: '/images/palestra.png' },
    { name: 'Outdoor', image: '/images/outdoor.png' }
  ];

  currentIndex = 0;
  interval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startAutoSlide() {
    this.interval = setInterval(() => this.nextSlide(), 4000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }
}
