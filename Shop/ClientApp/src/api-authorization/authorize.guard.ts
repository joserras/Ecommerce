import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { tap } from 'rxjs/operators';
import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';
import { ToastrService } from 'ngx-toastr';
import { UserInformationService } from '../app/services/user-information.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authorize: UserInformationService, private router: Router, private toastr: ToastrService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const roles = route.data["roles"] as Array<string>;
        if (roles[0] === "Admin") {
          if (this.authorize.isAuthenticated && this.authorize.user.rol == "Admin")
            return true;
          else this.handleAuthorization(state);
        }
        else if (roles[0] === "Ordinary"){
          if (this.authorize.isAuthenticated)
            return true;
          else this.handleAuthorization(state);
        }
      }
     
  private handleAuthorization(state: RouterStateSnapshot) {
    if (!this.authorize.isAuthenticated) {
      this.toastr.warning('Advertencia!', "Debe iniciar sesión");
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    }
  }
}
