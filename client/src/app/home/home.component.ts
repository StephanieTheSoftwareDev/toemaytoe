import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants = [];
  restaurant = {};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }
  

  ngOnInit() {
    this.getRestaurants()
  }

  getRestaurants(){
    let observable = this._httpService.getRestaurants();
    console.log("You've entered the getRestaurant function in Home Component!")
    observable.subscribe(data => {
      console.log("Restaurants!", data["data"])
      this.restaurants = data["data"];
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
  showRestaurant(restaurant){
    console.log("Show Restaurant!",restaurant)
    this._httpService.showRestaurant(restaurant)
  }

  deleteRestaurant(restaurant) {
    let observable = this._httpService.deleteRestaurant(restaurant);

    observable.subscribe(data => {
      this._router.navigate(['/'])
    })
  }


}
