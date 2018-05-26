import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { ServerLinkComponent } from '../../shared/server-link.component';
import * as fromRecipe from './recipe.reducers';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as firebase from 'firebase';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
  .ofType(RecipeActions.FETCH_RECIPES)
  .switchMap(
    (action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(this.servelinkComponent.url, {
        observe: 'body',
        responseType: 'json'
      });
    }
  )
  .map(
    (recipes) => {
      // tslint:disable-next-line:prefer-const
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .withLatestFrom(
    this.store.select('recipes')
  )
  .switchMap(
    ([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        this.servelinkComponent.url,
        state.recipes,
        {
          // params: new HttpParams().set('auth', token),
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    }
  );

  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private servelinkComponent: ServerLinkComponent,
    private store: Store<fromRecipe.IFeatureRecipeState>) {}
}
