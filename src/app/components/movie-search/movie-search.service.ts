import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {

  baseUrl = 'https://www.omdbapi.com/?&apikey=3ee52fac&';


  constructor(private http: HttpClient) { }

  getMovieDetails(userInput: string) {
    return this.http.get(this.baseUrl+`s=${userInput}`).toPromise();
  }

  getRandomMovies(randomID: string) {
    return this.http.get(this.baseUrl+`i=${randomID}`).toPromise();
  }
  
}
