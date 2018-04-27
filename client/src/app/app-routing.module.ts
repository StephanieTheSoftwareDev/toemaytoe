import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'new', component: NewComponent },
  { path: 'write/:id',component: WriteComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: '**',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
