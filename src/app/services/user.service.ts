import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../shared/models/userlogin.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USER:string = "https://api-user-server.herokuapp.com/api";
  
  constructor(private http:HttpClient) { }

  login(credentials: UserModel) {
    // https://api-user-server.herokuapp.com/api/auth/local [POST]
    // l'API attend une requête avec les données : {identifier: '', password: ''}

    let userData = {
      identifier : credentials.email,
      password: credentials.password 
    };
    
    return this.http.post(this.API_USER+"/auth/local", userData); // Observable
  }
}
