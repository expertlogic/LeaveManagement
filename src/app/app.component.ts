import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AccountService } from './_services/account.service';
import { EventBusService } from './_shared/event-bus.service';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  user?: User | null;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AccountService,
    private eventBusService: EventBusService
  ) {
    this.authService.user.subscribe(x => this.user  = x);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.userRole;
debugger;
      this.showAdminBoard = this.roles?.includes('Administrator');
      this.username = user.userName;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
