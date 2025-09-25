import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  banners = [
    { image: '/images/banner1.png', title: 'Nuova collezione running' },
    { image: '/images/banner2.png', title: 'Attrezzatura palestra -30%' },
    { image: '/images/banner3.png', title: 'Sport outdoor' }
  ];

  categories = [
    { name: 'Running', image: '/images/running.png' },
    { name: 'Calcio', image: '/images/calcio.png' },
    { name: 'Palestra', image: '/images/palestra.png' },
    { name: 'Outdoor', image: '/images/outdoor.png' }
  ];

  currentIndex = 0;
  interval: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    this.setAspectRatio();
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

  private setAspectRatio() {
    const img = new Image();
    img.src = this.banners[0].image;
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      const carouselEl = this.el.nativeElement.querySelector('.carousel');
      if (carouselEl) {
        carouselEl.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
        console.log(`Aspect ratio impostato a ${ratio.toFixed(2)} (${img.naturalWidth}:${img.naturalHeight})`);
      }
    };
  }
}
