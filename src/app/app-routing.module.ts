import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { BoxDashboardComponent } from './box-dashboard/box-dashboard.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
import { SymbolDashboardComponent } from './symbol-dashboard/symbol-dashboard.component';
import { OperationDashboardComponent } from './operation-dashboard/operation-dashboard.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'users', component: UserDasboardComponent},
  { path: 'boxes', component: BoxDashboardComponent},
  { path: 'properties', component: PropertyDashboardComponent},
  { path: 'operations', component: OperationDashboardComponent},
  { path: 'symbols', component: SymbolDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'import-excel', component: ImportExcelComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
