import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private alert:AlertService,
    private router:Router
    ) {}

  ngOnInit() {
    // Quand les vues et le Data Binding sont prêts

    // Construction d'une instance de la classe FormGroup
    this.loginForm = this.fb.group(
      {
        email:['', [Validators.email, Validators.required]],
        password:['', Validators.required]
        // Les champs de formulaire sont des instances de FormControl
      }
    )
  }

  onSubmit() {
    console.log(this.loginForm);

    // Gestion du Submit
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value); // permet d'avoir toutes les valeurs du formulaire
      
      // Faire la requête pour poster les données
      this.userService.login(this.loginForm.value)
      .subscribe( (response:any) => {
          console.log(response);

          // je stock le token dans le local storage du navigateur
          localStorage.setItem('token', response.jwt);
          if(response.jwt) {
            this.alert.showAlert("Authentification réussie!");
            this.router.navigate(['/']);
          }
        }
      )

    }
  }

}
