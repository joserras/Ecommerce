import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
 
  setProduct(productForm: any):Observable<any> {   
    return this.http.post<any>("api/product/NewProductProfile", productForm);
  }

  constructor(private http: HttpClient, private router: Router) { }
}
