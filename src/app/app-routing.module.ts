import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', component: ShoppingListComponent,
      canActivate: [AuthGuard]  }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadingStrategy }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
