import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editRestaurant: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.editRestaurant = this._httpService.restaurant
  }
  saveRestaurant(){
    let observable = this._httpService.saveRestaurant(this.editRestaurant);
    observable.subscribe(data => {
      if((data as any).message == "Error") {
        this.error = "All fields need to have at least 3 characters in length"
      }else{
        this._router.navigate(['/'])
      }



    })

  }

}