import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule  } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from "@angular/flex-layout";

import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { NextMatchDialog } from './favorite-teams/next-match-dialog.component';
import { TeamDetailsDialog } from './competition-details/team-details-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteTeamsComponent } from './favorite-teams/favorite-teams.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  entryComponents: [
    NextMatchDialog,
    TeamDetailsDialog,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CompetitionDetailsComponent,
    NextMatchDialog,
    TeamDetailsDialog,
    FavoriteTeamsComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    LayoutModule,
    FlexLayoutModule,
    RouterModule.forRoot([{
        path: '', //Default routing
        redirectTo: '/main-menu', 
        pathMatch: 'full'
      }, 
      { path: 'main-menu', component: MainMenuComponent },
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
