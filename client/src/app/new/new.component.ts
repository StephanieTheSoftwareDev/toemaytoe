import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newRestaurant = { 
      name: "",
      type: "",
    };
  }

  onSubmit(){
    let observable = this._httpService.addNewRestaurant(this.newRestaurant)
    let obs = this._httpService.showRestaurantById(this.newRestaurant)
    console.log("clicked", this.newRestaurant)
    observable.subscribe(data => {
      if ((data as any).message == "Error") {
        this.error = "Must have 3 or more characters in length!"

      }
      else {
        this._router.navigate([''])
      }
    })

  }

}