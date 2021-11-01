import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {path:'', redirectTo:'compras', pathMatch:'full'},
  {path:'compras',component:ComprasComponent},
  {path:'ventas',component:VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
