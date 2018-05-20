import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface IAppState {
  shoppingList: fromShoppingList.IIngredientsState;
  auth: fromAuth.IAppState;
}

export const reducers: ActionReducerMap<IAppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
