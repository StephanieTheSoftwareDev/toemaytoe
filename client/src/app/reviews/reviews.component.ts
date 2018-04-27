import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  newCustomer: any;
  restaurant: any;
  error: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newCustomer = [{
      name:"",
      stars:"",
      review:"",
    }];
    this.restaurant = this._httpService.restaurant;
  //   this._route.params.subscribe((params: Params) => {

      
  //   });
  // }  
  }
  
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
