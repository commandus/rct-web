import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'import-excel', component: ImportExcelComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
