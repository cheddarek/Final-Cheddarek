import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './products/navbar/navbar.component';
import { ListComponent } from './products/product_list/list.component';
import { CartComponent } from './products/cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { ChekoutComponent } from './products/chekout/chekout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {CommandeService} from './services/commande.service';
import {HostService} from './services/host.service';
import {ProduitService} from './services/produit.service';
import {UserService} from './services/user.service';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './headers/user-header/header.component';
import { TeamComponent } from './team/team.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AdminHeaderComponent } from './headers/admin-header/admin-header.component';
import { AdminProductListComponent } from './products/admin-product-list/admin-product-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AddMarqueComponent } from './marque/add-marque/add-marque.component';
import { MarqueListComponent } from './marque/marque-list/marque-list.component';
import { UpdateMarqueComponent } from './marque/update-marque/update-marque.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CommandesListComponent } from './commande/commandes-list/commandes-list.component';
import {ToastrModule} from 'ngx-toastr'
import { ToastrService } from 'ngx-toastr';
import {NgxLoadingModule} from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppToasterService} from './services/toaster.service';
import {MarqueService} from './services/marque.service';
import {CategoryService} from './services/category.service';
import {UserGuardService} from './services/authGuards/user-guard.service';
import {AdminGuardService} from './services/authGuards/admin-guard.service';
import { MunicipalityComponent } from './municipality/municipality.component';
import {MunicipalityGuardService} from './services/authGuards/municipality-guards.service';
import {DeliveryGuardService} from './services/authGuards/delivery-guards.service';
import { CommandesComponent } from './delevey/commandes/commandes.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ListComponent,
    CartComponent,
    FooterComponent,
    ChekoutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TeamComponent,
    AddProductComponent,
    AdminHeaderComponent,
    AdminProductListComponent,
    CategoryListComponent,
    AddMarqueComponent,
    MarqueListComponent,
    UpdateMarqueComponent,
    UpdateCategoryComponent,
    AddCategoryComponent,
    CommandesListComponent,
    MunicipalityComponent,
    CommandesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      preventDuplicates: true,

    }),
    NgxLoadingModule.forRoot({})

  ],
  providers: [
    AuthService,
    CommandeService,
    HostService,
    ProduitService,
    UserService,
    AppToasterService,
    MarqueService,
    CategoryService,
    UserGuardService,
    AdminGuardService,
    MunicipalityGuardService,
    DeliveryGuardService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
