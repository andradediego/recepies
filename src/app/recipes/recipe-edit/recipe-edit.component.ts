import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.IFeatureRecipeState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  onSubmit () {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
    console.log(this.recipeForm);
  }

  onDeleteIngredient (index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient () {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.createIngredientControl(null, null)
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // tslint:disable-next-line:prefer-const
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: fromRecipe.IRecipeState) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            // tslint:disable-next-line:prefer-const
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                this.createIngredientControl(ingredient.name, ingredient.amount)
              );
            }
          }
        }
      );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  private createIngredientControl(name: string, amount: number) {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

}
