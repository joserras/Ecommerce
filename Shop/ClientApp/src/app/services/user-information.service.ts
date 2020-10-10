import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model'
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { ProductProfile } from '../models/productProfile.model';
@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  public user: User;
  public isAuthenticated: boolean = false;


  login(user: any): void {
    this.http.post<any>('api/authorization/login',
      {
        Email: user.email,
        Password: user.password,
        RememberMe: user.rememberme
      }).subscribe(
        response => {
          console.log(response);
          this.user = response;
          this.isAuthenticated = true;
          //this.toastr.success('Hello world!', 'Toastr fun!');
          this.router.navigate(['/']);
        }),
      err =>
      {
        console.log(err);
        this.toastr.error('ERROR!', err);
      };
  }
  searchProduct(value:any): Observable<ProductProfile[]> {
    return this.http.post<any>("api/product/GetProducts",
      {Value:value});
  }
  register(user: any): void {

    this.http.post<any>('api/authorization/register',
      {
        Email: user.email,
        Password: user.password,
        Password2: user.password2,
        FullName: user.name
      }).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/']);
        });
  }
}
