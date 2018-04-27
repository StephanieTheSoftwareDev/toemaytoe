import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  newMovieReview: any;
  movie: any;
  error: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newMovieReview = [{
      name:"",
      stars:"",
      review:"",
    }];
    this.movie = this._httpService.movie;
    console.log("onInitfunc in reviews.comonent.ts",this.movie)
    // this.showMovieById()
  //   this._route.params.subscribe((params: Params) => {

      
  //   });
  // }  
  }
  deleteMovie(movie) {
    let observable = this._httpService.deleteMovie(movie);

    observable.subscribe(data => {
      this._router.navigate(['/'])
    })
  }
  // showMovieById(){
  //   let observable = this._httpService.showMovieById(this.movie);
  //   console.log("You've entered the getMovieByID function in Reviews Component!")
  //   observable.subscribe(data => {
  //     console.log("Movies!", data["data"])
  //     this.movie = data["data"];
  //   })
  // }
  
  // onSubmit(){
  //   let observable = this._httpService.addNewCustomer(this.newCustomer);
  //   observable.subscribe(data => {
  //     console.log(data)
  //     if ((data as any).message == "Error") {
  //       this.error = "Review needs to be at least 3 characters in length"
  //     }else {
  //       this._router.navigate(['/reviews/'+ this.restaurant._id])
  //     }
  //   })
  // }



}
