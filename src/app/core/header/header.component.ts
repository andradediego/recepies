import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router) { }

  onSaveData() {
    this.dataStorageService
      .storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
