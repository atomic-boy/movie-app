import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { MovieModel } from '../shared/models/movie.models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies$: BehaviorSubject<any> = new BehaviorSubject([]);
  private searchedMovies$: BehaviorSubject<any> = new BehaviorSubject([]);
  private indexPage:number = 1;

  constructor(private http:HttpClient) {}


  getMoviesFromApi():void {

    let params = new HttpParams()
    .set('api_key', '0bdb727273106dfa354ae01d3f722c8a')
    .set('language', 'fr')
    .set('page', this.indexPage)

    // je mappe mes objets movie en utilisant l'opérateur pipe et map
    this.http.get("https://api.themoviedb.org/3/discover/movie", {params})
    // le pipe RxJS permet d'executer ce qu'on veut: nous on va mapper nos objets
      .pipe(
        map( (apiResponse:any) => {
              return apiResponse.results.map((movie:any) => new MovieModel(movie))
              }
        ) 
      )
    // execute la requête HTTP
      .subscribe( (response:any) => {
        let actualMovies = this.movies$.getValue();
        let allMovies:any = [...actualMovies, ...response];
        this.movies$.next(allMovies);
      })
    this.indexPage++;
  }

  getMovies$() {
    return this.movies$.asObservable();
  }

  setMovie$(movies:any) {
    this.movies$.next(movies);
  }

  ////////////////////////////// BARRE DE RECHERCHE //////////////////////////////

  getsearchedMovies$() {
    return this.searchedMovies$.asObservable();
  }

  searchMoviesFromApi(userSearch:string) {
    let params = new HttpParams()
    .set('api_key', '0bdb727273106dfa354ae01d3f722c8a')
    .set('language', 'fr')
    .set('query', userSearch)

    // je mappe mes objets movie en utilisant l'opérateur pipe et map
    this.http.get("https://api.themoviedb.org/3/search/movie", {params})
    // le pipe RxJS permet d'executer ce qu'on veut: nous on va mapper nos objets
      .pipe(
        map( (apiResponse:any) => {
              return apiResponse.results.map((movie:any) => new MovieModel(movie))
              }
        ) 
      )
    // execute la requête HTTP
      .subscribe( (response:any) => {
        console.log(response);
        let allMovies:any = response;
        this.searchedMovies$.next(allMovies);
      })

  }

  ////////////////////////////// FICHE FILM //////////////////////////////

  getVideosFromApi(id:number):any {
    // return l'Observable de get(url)

    let params = new HttpParams()
    .set('api_key', '0bdb727273106dfa354ae01d3f722c8a')
    .set('language', 'fr');

    return this.http.get("https://api.themoviedb.org/3/movie/" + id +"/videos", {params})   

  }

}


