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
import { CardByIdEditComponent } from './card-by-id-edit/card-by-id-edit.component';
import { AddIntoBoxComponent } from './add-into-box/add-into-box.component';
import { SymbolPropertyDashboardComponent } from './symbol-property-dashboard/symbol-property-dashboard.component';
import { PendingChangesGuard } from './pending-changes-guard.service';
import { CleanAllComponent } from './clean-all/clean-all.component';

// @see https://stackoverflow.com/questions/35922071/warn-user-of-unsaved-changes-before-leaving-page
const routes: Routes = [
  { path: '', component: DashboardComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'users', component: UserDasboardComponent },
  { path: 'boxes', component: BoxDashboardComponent },
  { path: 'properties', component: PropertyDashboardComponent },
  { path: 'operations', component: OperationDashboardComponent },
  { path: 'symbols', component: SymbolDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'import-excel', component: ImportExcelComponent },
  { path: 'stat', component: StatComponent },
  { path: 'log', component: LogDashboardComponent },
  { path: 'log/:box', component: LogDashboardComponent },
  { path: 'log/:box/:card_id', component: LogDashboardComponent },
  { path: 'card/:id', component: CardByIdEditComponent },
  { path: 'add-into-box', component: AddIntoBoxComponent },
  { path: 'symbol-property', component: SymbolPropertyDashboardComponent },
  { path: 'clean', component: CleanAllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
