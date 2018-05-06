
import { Component, OnInit } from '@angular/core';

import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// import { Recipe } from './../recipe.model';

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
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];

        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode);

      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  onSubmit () {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
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
      const recipe = this.recipeService.getRecipe(this.id);
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
