import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './products/cart/cart.component';
import {ChekoutComponent} from './products/chekout/chekout.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {TeamComponent} from './team/team.component';
import {AdminProductListComponent} from './products/admin-product-list/admin-product-list.component';
import {AddProductComponent} from './products/add-product/add-product.component';
import {AddMarqueComponent} from './marque/add-marque/add-marque.component';
import {MarqueListComponent} from './marque/marque-list/marque-list.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {UpdateMarqueComponent} from './marque/update-marque/update-marque.component';
import {AddCategoryComponent} from './category/add-category/add-category.component';
import {CommandesListComponent} from './commande/commandes-list/commandes-list.component';
import {UserGuardService} from './services/authGuards/user-guard.service';
import {MunicipalityComponent} from './municipality/municipality.component';
import {CommandesComponent} from './delevey/commandes/commandes.component';
import {AdminGuardService} from './services/authGuards/admin-guard.service';
import {DeliveryGuardService} from './services/authGuards/delivery-guards.service';
import {MunicipalityGuardService} from './services/authGuards/municipality-guards.service';

const routes: Routes = [

  {path: 'login',component:LoginComponent},
  {path: 'team',component:TeamComponent},
  {path: 'register',component:RegisterComponent},

  {path: 'products',component:ProductsComponent,canActivate:[UserGuardService]},
  {path: 'cart',component:CartComponent,canActivate:[UserGuardService] },
  {path: 'checkout',component:ChekoutComponent,canActivate:[UserGuardService]},


  {path: 'admin/products',component:AdminProductListComponent,canActivate:[AdminGuardService]}, //admin
  {path: 'products/add',component:AddProductComponent,canActivate:[AdminGuardService]},  //admin

  {path: 'marques',component:MarqueListComponent,canActivate:[AdminGuardService]},   //admin
  {path: 'marques/add',component:AddMarqueComponent,canActivate:[AdminGuardService]},  //admin
  {path: 'marques/id',component:UpdateMarqueComponent,canActivate:[AdminGuardService]}, //admin

  {path: 'categories',component:CategoryListComponent,canActivate:[AdminGuardService]}, //admin
  {path: 'categories/add',component:AddCategoryComponent,canActivate:[AdminGuardService]}, //admin
  {path:"commandes",component:CommandesListComponent,canActivate:[UserGuardService]},   //admin

  {path :"mcommande",component:MunicipalityComponent,canActivate:[MunicipalityGuardService]},   //municipality

  {path :"delevery/commande",component:CommandesComponent,canActivate:[DeliveryGuardService]},// delivery man

  {path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
