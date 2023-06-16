import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { HttpClientModule } from '@angular/common/http';
import { QueryComponentComponent } from './query-component/query-component.component';
import { BoxTreeComponent } from './box-tree/box-tree.component';
import { PackageListComponent } from './package-list/package-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentListComponent,
    QueryComponentComponent,
    BoxTreeComponent,
    PackageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
