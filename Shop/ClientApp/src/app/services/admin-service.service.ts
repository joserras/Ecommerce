import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductProfile } from '../models/productProfile.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    setProduct(productForm: any): Observable<any> {
        return this.http.post<any>("api/product/NewProductProfile", productForm);
    }

    getCategories(): Observable<any> {
        return this.http.get<ProductProfile>("api/categories/GetCategories");
    }

    getLastProducts(): Observable<any> {
        return this.http.get<any>("api/product/GetLastProducts");
    }

    constructor(private http: HttpClient, private router: Router) { }
}
