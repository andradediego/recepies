import { Injectable } from '@angular/core';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ServerLinkComponent } from './server-link.component';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private servelinkComponent: ServerLinkComponent) { }

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put(this.servelinkComponent.url,
    //   this.recipeService.getRecipes(), {
    //     // observe: 'events'
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token),
    //     // headers: new HttpHeaders().set('Autho')
    //   });
    const req = new HttpRequest(
      'PUT',
      this.servelinkComponent.url,
      this.recipeService.getRecipes(),
      {
        // params: new HttpParams().set('auth', token),
        reportProgress: true
      }
    );
    return this.httpClient.request(req);
  }

  getRecipes() {
    // tslint:disable-next-line:prefer-const
    // const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>(this.servelinkComponent.url, {
      observe: 'body',
      responseType: 'json',
      // params: new HttpParams().set('auth', token),
  })
    .map(
      (recipes) => {
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
