import { Component, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isMappedTypeNode } from 'typescript';
import { LoginComponent } from './componentes/login/Login.component';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {

  constructor(private dataService: DataService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const requiresLogin = route.data.requiresLogin || false;
    const requiresAdmin = route.data.requiresAdmin || false;

    if (requiresAdmin) {
      if(localStorage.getItem("idSession") == "1"){
        return true;
      }
          
      else if (localStorage.getItem("idSession") != null){
            this.router.navigateByUrl("inicio");
            return false;
          }
      
      else{
        this.router.navigateByUrl("login");
      }
    }

    else if(requiresLogin){
      if(localStorage.getItem("idSession") != null){
        return true;
      }
      else{
        this.router.navigateByUrl("login");
      }
    }

  }
}
