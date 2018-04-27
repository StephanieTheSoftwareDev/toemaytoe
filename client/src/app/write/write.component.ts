import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  newCustomer: any;
  restaurant: any;
  error: any;
  restaurants = [];
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newCustomer = {name: "", stars: "", review:""};
    this.restaurant = this._httpService.restaurant;
    this.getRestaurants()
  }
  getRestaurants(){
    let observable = this._httpService.getRestaurants();
    console.log("Got the restaurant!", this.restaurant)

    observable.subscribe(data => {
      console.log("Restaurants!", data["data"])
      this.restaurants = data["data"];
    })
    
  }

  onSubmit(){
    let observable = this._httpService.addNewCustomer(this.restaurant._id, this.newCustomer);
    console.log("This new customer is...", this.newCustomer)
    observable.subscribe(data => {
      console.log("on Submit function write component!", data);
      if ((data as any).message == "Error") {
        this.error = "Review needs to be at least 3 characters in length"
      }else {
        this._router.navigate(['/reviews/'+ this.restaurant._id])
      }
    })
  }
}
