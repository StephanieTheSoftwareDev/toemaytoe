import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  newMovieReview: any;
  movie: any;
  error: any;
  movies = [];
  selval: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.selval = '1';
    this.newMovieReview = {name: "", stars: "", review:""};
    this.movie = this._httpService.movie;
    this.getMovies()
  }
  getMovies(){
    let observable = this._httpService.getMovies();
    console.log("getMovies func in write.component.ts", this.movie)

    observable.subscribe(data => {
      console.log("Movies!", data["data"])
      this.movies = data["data"];
    })
    
  }

  onSubmit(){
    let observable = this._httpService.addNewMovieReview(this.movie._id, this.newMovieReview);
    console.log("onSubmit func in write.components.ts", this.newMovieReview)
    observable.subscribe(data => {
      console.log("on Submit function write component!", data);
      if ((data as any).message == "Error") {
        this.error = "You must provide your name, which should contain at least 3 characters! \n Your rating must be between 1 and 5 stars! \n You must provide a review of at least 3 characters!"
      }else {
        this._router.navigate(['/reviews/'+ this.movie._id])
      }
    })
  }
}
