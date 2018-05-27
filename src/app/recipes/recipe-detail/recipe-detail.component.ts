import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.IRecipeState>;
  index: number;
  authState: Observable<fromAuth.IAuthState>;

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private store: Store<fromRecipe.IFeatureRecipeState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
    this.authState = this.store.select('auth');
  }

  onAddToShoppingList() {
    this.store.select('recipes')
    .pipe(take(1)).subscribe(
      (recipeState: fromRecipe.IRecipeState) => {
        this.store
          .dispatch(new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.index].ingredients
          ));
      }
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.index, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
