import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesDetailComponent } from './components/launches-detail/launches-detail.component';
import { LaunchesListComponent } from './components/launches-list/launches-list.component';

const routes: Routes = [
  { path: 'detail/:flight_number', component: LaunchesDetailComponent},
  { path: '**', component: LaunchesListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
