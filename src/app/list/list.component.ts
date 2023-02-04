import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  movies:Array<any> = [];

  constructor(private movieService:MovieService) {
    console.log(this);
  }

  ngOnInit() {
    this.movieService.getMoviesFromApi();

    // le component ListComponent s'abonne au Subject movies$
    
    // A eviter car un dev peut ajouter la méthode next() après le subscribe
    // car movies$ est de type Subject
    // this.movieService.movies$
    //   .subscribe( (response:any) => { this.movies = response;});

    // avec getMovie$ on retourne un obervable donc on ne pourra pas faire next()
    // depuis le composant
    this.movieService.getMovies$()
      .subscribe( (response:any) => { this.movies = response;});
  }

  getImgUrl(path:string):string {
    return "https://image.tmdb.org/t/p/w533_and_h300_bestv2" + path;
  }


}
