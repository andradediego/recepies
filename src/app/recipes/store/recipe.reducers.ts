import * as RecipeActions from './recipe.actions';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { IAppState } from './../../store/app.reducers';

export interface IRecipeState {
  recipes: Recipe[];
}

// lazy loading
export interface IFeatureRecipeState extends IAppState {
  recipes: IRecipeState;
}

const initialState: IRecipeState = {
  recipes: [
    new Recipe (
      'A Test Recipe 1',
      'This is simply a test 1',
      'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
      [
        new Ingredient('Fish', 2),
        new Ingredient('Orange', 1)
      ]
    ),
    new Recipe (
      'A Test Recipe 2',
      'This is simply a test 2',
      'https://www.eatingthaifood.com/wp-content/uploads/2017/05/thai-cashew-chicken-recipe.jpg',
      [
        new Ingredient('Potato', 5),
        new Ingredient('Beans', 20)
      ]
    )
  ]
};

export function recipeReducer (state = initialState,
  action: RecipeActions.RecipeActions) {
    switch (action.type) {
      case (RecipeActions.SET_RECIPES):
        return {
          ...state,
         recipes: [...action.payload]
        };
      case (RecipeActions.ADD_RECIPE):
        return {
          ...state,
         recipes: [...state.recipes, action.payload]
        };
      case (RecipeActions.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updatedRecipe = {
          ...recipe,
          ...action.payload.updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updatedRecipe;
        return {
          ...state,
          recipes: recipes
        };
      case (RecipeActions.DELETE_RECIPE):
        const oldRecipes = [...state.recipes];
        oldRecipes.splice(action.payload, 1);
        return {
         ...state,
         recipes: oldRecipes
        };
      default:
        return state;
    }
}
