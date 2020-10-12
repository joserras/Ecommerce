import { Component, OnInit, Input } from '@angular/core';
import { ProductProfile } from '../../models/productProfile.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    @Input() product: ProductProfile;
    constructor() { }

    ngOnInit(): void {
        console.log(this.product);
    }

}
