import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent {

  constructor(private movieService:MovieService) {

  }

  onClickNextBtn() {
    // appelle les methodes du movieService getNextMoviesFromApi()
    this.movieService.getMoviesFromApi();
  }

}
