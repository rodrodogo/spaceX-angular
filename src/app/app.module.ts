import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchesListComponent } from './components/launches-list/launches-list.component';
import { LaunchesDetailComponent } from './components/launches-detail/launches-detail.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/launches.reducer';
import { SafePipe } from './pipes/safe.pipe';
import { LaunchesEditComponent } from './components/launches-edit/launches-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LaunchesListComponent,
    LaunchesDetailComponent,
    SafePipe,
    LaunchesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      launches: reducer
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
