import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
      new Recipe(
        'A Test Recipe 1',
        'This is simply a test 1',
        'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
        [
          new Ingredient('Fish', 2),
          new Ingredient('Orange', 1)
        ]
      ),
      new Recipe(
        'A Test Recipe 2',
        'This is simply a test 2',
        'https://www.eatingthaifood.com/wp-content/uploads/2017/05/thai-cashew-chicken-recipe.jpg',
        [
          new Ingredient('Potato', 5),
          new Ingredient('Beans', 20)
        ]
      )
  ]

  constructor(private slService: ShoppingListService){ }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}