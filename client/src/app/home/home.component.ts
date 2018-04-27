import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies = [];
  movie = {};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }
  

  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    let observable = this._httpService.getMovies();
    console.log("getMovies function in home.component.ts!")
    observable.subscribe(data => {
      console.log("Movies!", data["data"])
      this.movies = data["data"];
      // this.restaurants.sort(function (a, b) {
      //   if (a.type < b.type) {
      //     return -1;
      //   }
      //   if (a.type > b.type) {
      //     return 1;
      //   }
      //   return 0
      // })
    })
  }
  showMovie(movie){
    console.log("showMovie func in home.component.ts!",movie)
    this._httpService.showMovie(movie)
  }

  deleteMovie(movie) {
    let observable = this._httpService.deleteMovie(movie);

    observable.subscribe(data => {
      this._router.navigate(['/'])
    })
  }


}
