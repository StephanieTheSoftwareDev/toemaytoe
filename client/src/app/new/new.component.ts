import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newMovie: any;
  newMovieReview: any;
  error: any;
  selval: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.selval = '1';
    this.newMovie = { 
      name: "",
      movie_review: {name: "", stars: "", review:""}
    };
  }

  onSubmit(){
    let observable = this._httpService.addNewMovie(this.newMovie)
    let obs = this._httpService.showMovieById(this.newMovie)
    console.log("clicked", this.newMovie)
    observable.subscribe(data => {
      if ((data as any).message == "Error") {
        this.error = "Movies must have a title that contain at least 3 characters! \n You must provide your name, which should contain at least 3 characters! \n Your rating must be between 1 and 5 stars! \n You must provide a review of at least 3 characters!"

      }
      else {
        this._router.navigate([''])
      }
    })

  }

}