import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.models';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchedMovies:Array<MovieModel> = [];

  constructor(private movieService:MovieService,private router:Router) {}

  onKeyupInput(userInput:string){

    if (userInput.length > 2) {
      this.movieService.searchMoviesFromApi(userInput);
  
      this.movieService.getsearchedMovies$()
      .subscribe( (response:any) => { this.searchedMovies = response;});
    } else if (userInput.length == 0) {
      this.searchedMovies = [];
    }

  }

  cleanListResult() {
    this.searchedMovies = [];
  }

  goMovieDetails(id:number) {
    console.log("TEST");
    this.router.navigate(['/detail',id]);
  }

}
