import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  // Définir des routes = une URL <=> un composant
  {
    path:'', //localhost par défaut
    component: ListComponent
  },
  {
    path:'detail/:id',
    component: DetailComponent
  },
  {
    path:'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
