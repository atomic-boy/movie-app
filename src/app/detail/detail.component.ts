import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  movie: any = {};
  paramId:number = 0;
  videoUrl!:SafeResourceUrl;

  // ActivatedRoute permet de récupérer les paramètres de l'URL
  constructor(
    private route: ActivatedRoute,
    private router:Router, // permet la navigation 
    private movieService: MovieService,
    private sanitizer:DomSanitizer) {}

  ngOnInit() {

    this.paramId = this.route.snapshot.params['id']; 
    // console.log(this.paramId); //snapshot = URL

    // Récupération des films via movie$ dans MovieService
    this.movieService
      .getMovies$()
      .subscribe( (movies:MovieModel[]) => {
          this.movie = movies.find( (movie) => movie.id == this.paramId)
      })


    // Récupération de la liste des vidéos
    this.movieService
      .getVideosFromApi(this.paramId)
      .subscribe( (response:any) => { 
          console.log(response);
          let videoId = response.results[0].key
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId);

        }
      )

  }

  getImgUrl(path:string):string {
    return "https://image.tmdb.org/t/p/w533_and_h300_bestv2" + path;
  }

  goBack() {
    // La méthode navigate d'un objet Router permet la navigation
    // IDEM que l'attribut routerLink="/" dans le HTML
    this.router.navigate(['/']);
  }

}
