import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SplashScreenStateService } from '../services/splash-screen-state.service';
import { Router } from '@angular/router';

@Injectable()
export class HomepageResolver implements Resolve<any> {

  constructor(private splashScreenStateService: SplashScreenStateService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.splashScreenStateService.stop();
      }, 5000);
      this.router.navigateByUrl('pVentana');
    });
  }

}
