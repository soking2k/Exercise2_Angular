import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementsComponent } from './agreements/agreements.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: "home",component: HomeComponent},
{path: "agreements",component: AgreementsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
