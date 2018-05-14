import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ServerLinkComponent } from './server-link.component';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
    private recipeService: RecipeService,
    private servelinkComponent: ServerLinkComponent,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(this.servelinkComponent.url + '?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    // tslint:disable-next-line:prefer-const
    const token = this.authService.getToken();

    this.http.get(this.servelinkComponent.url + '?auth=' + token)
    .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        // tslint:disable-next-line:prefer-const
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
