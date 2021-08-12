import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardGuard} from './helper/auth-guard.guard';


const routes: Routes = [
  {
    path: 'products',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
