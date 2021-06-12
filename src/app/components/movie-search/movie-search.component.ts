import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from './movie-search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  randomMovies: any;
  value = 'Clear me';
  movieName = "";
  // movieList :movieData[] = [];
  movieList :any;
  randomMovieID = "tt128501";

  suggestedMovies = [
    {
      name:'loki'
    },
    {
      name:'terminator'
    },
    {
      name:'bahubhali'
    },
    {
      name:'forest gump'
    },
    {
      name:'drive angry'
    },
  ];

  constructor(private service: MovieSearchService) { }


  ngOnInit(): void {
  }

  // on user input
  async onSearchMovie() {
      // await this.service.getMovieDetails(this.movieName).then(
      // ).catch((error)=>{
      //   console.log("Something Went Wrong!!" + error);
      // });
      if(this.movieName === "") return alert("Please Enter MOvie Name!!!");
      let res = await this.service.getMovieDetails(this.movieName);
      
      if(res) {
        let resObj = JSON.parse(JSON.stringify(res));
        if(resObj['Response'] === 'False') alert("Error:" +resObj['Error']);
        this.movieList = resObj['Search'];
      } else {
        alert("Sorry...Something Went Wrong!! Please try Again.")
      }
  }

  // on suggested search
  async onSuggestedSearch() {
      let index =   Math.random() * (this.suggestedMovies.length - 0) + 0;
      let res = await this.service.getMovieDetails(this.suggestedMovies[Math.ceil(index)]['name']);
      if(res) {
        let resObj = JSON.parse(JSON.stringify(res));
        if(resObj['Response'] === 'False') alert("Error:" +resObj['Error']);
        this.movieList = resObj['Search'];
      } else {
        alert("Sorry...Something Went Wrong!! Please try Again.");
      }
  }

  // on random search
  async onRandonSearch() {
    let Id =   Math.random() * (10 - 1) + 1;
    let res = await this.service.getRandomMovies(this.randomMovieID+`${Math.ceil(Id)}`);
    if(res) {
      console.log(res);
      let resOBj = Object.assign({
        Title: String,
        Year:String,
        Poster:String
      },res);
      let arr = [];
      arr.push(resOBj)
      this.movieList = arr;
    } else {
      alert("Sorry...Something Went Wrong!! Please try Again.")
    }
  }
}

interface movieData {
  Title: string;
  Type?: string;
  Year:string;
  Poster:string;
  imdbID?:string;
}
