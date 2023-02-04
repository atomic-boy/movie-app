// export interface MovieModel {
//     id:number;
//     titre:string;
//     image_portrait:string;
//     image_landscape:string;
//     score:number;
//     date:Date;
// }
// on créé une interface si on veut juste typer
// dans notre cas on va créer une classe
// Grace a cette classe Modele, si le back-end change un jour le nom des data, on aura juste à le changer dans ce fichier

export class MovieModel {

    id:number;
    titre:string;
    resume:string;
    image_portrait:string;
    image_landscape:string;
    score:number;
    date:Date;

    constructor(movieFromApi:any) {
        this.id = movieFromApi.id;
        this.titre = movieFromApi.title;
        this.resume = movieFromApi.overview;
        this.image_portrait = movieFromApi.poster_path;
        this.image_landscape = movieFromApi.backdrop_path;
        this.score = movieFromApi.vote_average;
        this.date = movieFromApi.release_date;
    }
}