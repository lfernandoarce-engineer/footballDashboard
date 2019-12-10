import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule  } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router'

import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CompetitionDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    LayoutModule,
    RouterModule.forRoot([{
        path: '', //Default routing
        redirectTo: '/dashboard', 
        pathMatch: 'full'
      }, 
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'comp-details', component: CompetitionDetailsComponent }
    ]
    ),
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
