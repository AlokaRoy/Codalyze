import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'display-products'
  },
  {
    path: 'display-products',
    component: DisplayProductsComponent
  },
  {
    path: 'edit-products',
    component: EditProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
