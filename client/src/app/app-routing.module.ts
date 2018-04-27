import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  { path: 'movies',component: HomeComponent },
  { path: 'movies/new', component: NewComponent },
  { path: 'movies/review/:id',component: WriteComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'movies/:id', component: ReviewsComponent },
  { path: '**',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
