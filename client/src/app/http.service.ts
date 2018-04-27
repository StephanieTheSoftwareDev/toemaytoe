import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  movie: any;

  constructor(private _http: HttpClient) { }

  getMovies(){
    return this._http.get('/homeMovies');
  }
  addNewMovie(newMovie){
    return this._http.post('/newMovie', newMovie)
  }
  addNewMovieReview(id, newMovieReview){
    return this._http.put('/writeMovieReview/' + id, newMovieReview)
  }
  showMovieById(movie){
    return this._http.get('/reviewsMovie/' + movie._id, this.movie)
  }
  showMovie(movie){
    console.log("showMovie func in Service", movie)
    this.movie = movie
  }
  saveMovie(editMovie){
    this.movie = editMovie
    console.log("saveMovie func in Service", this.movie)
    return this._http.put('/editMovie/' + this.movie._id, this.movie)
  }
  deleteMovie(movie){
    return this._http.delete('/deleteMovie/' + movie._id)
  }
}