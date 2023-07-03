import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentListComponent } from './component-list/component-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { DashboardComponent } from './dashboard/dashboard.component';
import { QueryComponentComponent } from './query-component/query-component.component';
import { BoxTreeComponent } from './box-tree/box-tree.component';
import { PackageListComponent } from './package-list/package-list.component';
import { BoxCombolistComponent } from './box-combolist/box-combolist.component';
import { CardTableComponent } from './card-table/card-table.component';
import { FileNamePipe } from './pipe-file-name';
import { BoxPipe } from './pipe-box';
import { QtyColorPipe } from './pipe-qty-color';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { BoxAutocompleteComponent } from './box-autocomplete/box-autocomplete.component';
import { LoginComponent } from './login/login.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { BoxQtyComponent } from './box-qty/box-qty.component';
import { PropertyValueComponent } from './property-value/property-value.component';
import { PropertyTypeSelectComponent } from './property-type-select/property-type-select.component';
import { CardNominalPipe } from './pipe-card-nominal';
import { CardNamePipe } from './pipe-card-name';

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
    ImportExcelComponent,
    TopMenuComponent,
    BoxAutocompleteComponent,
    LoginComponent,
    DialogLoginComponent,
    DialogConfirmComponent,
    CardEditComponent,
    CardEditDialogComponent,
    BoxQtyComponent,
    PropertyValueComponent,
    PropertyTypeSelectComponent
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
    MatBadgeModule
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
