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
import { StatComponent } from './stat/stat.component';
import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'users', component: UserDasboardComponent},
  { path: 'boxes', component: BoxDashboardComponent},
  { path: 'properties', component: PropertyDashboardComponent},
  { path: 'operations', component: OperationDashboardComponent},
  { path: 'symbols', component: SymbolDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'import-excel', component: ImportExcelComponent},
  { path: 'stat', component: StatComponent},
  { path: 'log', component: LogDashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
