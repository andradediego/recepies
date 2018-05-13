import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ServerLinkComponent } from './server-link.component';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
    private recipeService: RecipeService,
    private servelinkComponent: ServerLinkComponent) { }

  storeRecipes() {
    return this.http.put(this.servelinkComponent.url,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.servelinkComponent.url)
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
