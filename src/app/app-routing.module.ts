import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryStatisticsComponent } from './country-statistics/country-statistics.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';

const routes: Routes = [
  { path: '', component: GeneralStatisticsComponent },
  { path: 'general', component: GeneralStatisticsComponent },
  { path: 'countries', component: CountryStatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
