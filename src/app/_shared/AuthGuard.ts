import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { StorageService } from '@app/_services/storage.service';

@Injectable({ providedIn: 'root' })
@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private authService: AccountService,private storage: StorageService,  private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.storage.isLoggedIn()) {
      this.router.navigate(['auth/login']);
    }
    return true;
  }
}
