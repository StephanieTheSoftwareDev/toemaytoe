import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  restaurant: any;

  constructor(private _http: HttpClient) { }

  getRestaurants(){
    return this._http.get('/homeRestaurants');
  }
  addNewRestaurant(newRestaurant){
    return this._http.post('/newRestaurant', newRestaurant)
  }
  addNewCustomer(id, newCustomer){
    return this._http.put('/writeCustomer/' + id, newCustomer)
  }
  showRestaurantById(restaurant){
    return this._http.get('/reviewsRestaurant/' + restaurant._id, this.restaurant)
  }
  showRestaurant(restaurant){
    console.log("Restaurant", restaurant)
    this.restaurant = restaurant
  }
  saveRestaurant(editRestaurant){
    this.restaurant = editRestaurant
    console.log("Restaurant", this.restaurant)
    return this._http.put('/editRestaurant/' + this.restaurant._id, this.restaurant)
  }
  deleteRestaurant(restaurant){
    return this._http.delete('/deleteRestaurant/' + restaurant._id)
  }
}