import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { ProductProfile } from '../../models/productProfile.model';

@Component({
  selector: 'app-last-products',
  templateUrl: './last-products.component.html',
  styleUrls: ['./last-products.component.css']
})
export class LastProductsComponent implements OnInit {
  slides: ProductProfile[] = []; 

  constructor(private adminService: AdminService) { }
  ngOnInit(): void
  {
    
    this.adminService.getLastProducts().subscribe(response => {
      console.log(response);
      for (let i = 0; i < 12;i++) {
        this.slides[i] = response[i];
      }
      console.log(this.slides);
    },
      error => { console.log(error); }
      
      );
  }
  //slides = [
  //  { img: "http://placehold.it/350x150/000000" },
  //  { img: "http://placehold.it/350x150/111111" },
  //  { img: "http://placehold.it/350x150/333333" },
  //  { img: "http://placehold.it/350x150/666666" },
  //  { img: "http://placehold.it/350x150/000000" },
  //  { img: "http://placehold.it/350x150/111111" },
  //  { img: "http://placehold.it/350x150/333333" },
  //  { img: "http://placehold.it/350x150/666666" }
  //];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 12 };


  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }




  

}
