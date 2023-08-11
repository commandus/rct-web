import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentListComponent } from './component-list/component-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorIntlRu } from './mat-paginator-ru';

import { FileNamePipe } from './pipe-file-name';
import { BoxPipe } from './pipe-box';
import { QtyColorPipe } from './pipe-qty-color';
import { CardNameNominalPipe } from './pipe-card-name-nominal';

import { DashboardComponent } from './dashboard/dashboard.component';
import { QueryComponentComponent } from './query-component/query-component.component';
import { BoxTreeComponent } from './box-tree/box-tree.component';
import { PackageListComponent } from './package-list/package-list.component';
import { BoxCombolistComponent } from './box-combolist/box-combolist.component';
import { BoxTableComponent } from './box-table/box-table.component';
import { BoxDashboardComponent } from './box-dashboard/box-dashboard.component';
import { CardTableComponent } from './card-table/card-table.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { BoxAutocompleteComponent } from './box-autocomplete/box-autocomplete.component';
import { LoginComponent } from './login/login.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { SymbolEditComponent } from './symbol-edit/symbol-edit.component';
import { SymbolEditDialogComponent } from './symbol-edit-dialog/symbol-edit-dialog.component';
import { SymbolTableComponent } from './symbol-table/symbol-table.component';
import { SymbolDashboardComponent } from './symbol-dashboard/symbol-dashboard.component';
import { BoxQtyComponent } from './box-qty/box-qty.component';
import { PropertyValueComponent } from './property-value/property-value.component';
import { PropertyTypeSelectComponent } from './property-type-select/property-type-select.component';
import { CardNominalPipe } from './pipe-card-nominal';
import { CardNamePipe } from './pipe-card-name';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { PropertyTableComponent } from './property-table/property-table.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
import { OperationTableComponent } from './operation-table/operation-table.component';
import { OperationDashboardComponent } from './operation-dashboard/operation-dashboard.component';
import { OperationEditComponent } from './operation-edit/operation-edit.component';
import { OperationEditDialogComponent } from './operation-edit-dialog/operation-edit-dialog.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { PropertytypeEditDialogComponent } from './propertytype-edit-dialog/propertytype-edit-dialog.component';
import { PropertytypeEditComponent } from './propertytype-edit/propertytype-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { StatComponent } from './stat/stat.component';
import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';
import { LogTableComponent } from './log-table/log-table.component';
import { DateTimePipe } from './pipe-sdate';
import { OperationPipe } from './pipe-operation';
import { CardByIdEditComponent } from './card-by-id-edit/card-by-id-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentListComponent,
    QueryComponentComponent,
    BoxTreeComponent,
    PackageListComponent,
    BoxCombolistComponent,
    CardTableComponent,
    FileNamePipe,
    BoxPipe,
    QtyColorPipe,
    CardNominalPipe,
    CardNamePipe,
    DateTimePipe,
    OperationPipe,
    CardNameNominalPipe,
    ImportExcelComponent,
    TopMenuComponent,
    BoxAutocompleteComponent,
    LoginComponent,
    DialogLoginComponent,
    DialogConfirmComponent,
    CardEditComponent,
    CardEditDialogComponent,
    SymbolEditComponent,
    SymbolEditDialogComponent,
    BoxQtyComponent,
    PropertyValueComponent,
    PropertyTypeSelectComponent,
    UserTableComponent,
    UserDasboardComponent,
    BoxTableComponent,
    BoxDashboardComponent,
    PropertyTableComponent,
    PropertyDashboardComponent,
    OperationTableComponent,
    OperationDashboardComponent,
    OperationEditComponent,
    OperationEditDialogComponent,
    SymbolTableComponent,
    SymbolDashboardComponent,
    SettingsMenuComponent,
    PropertytypeEditDialogComponent,
    PropertytypeEditComponent,
    UserEditComponent,
    UserEditDialogComponent,
    StatComponent,
    LogDashboardComponent,
    LogTableComponent,
    CardByIdEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDialogModule,
    MatBadgeModule,
    ScrollingModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlRu
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
