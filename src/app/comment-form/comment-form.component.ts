import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private alert:AlertService,
    private router:Router
    ) {}

    onSubmit() {
      
    }

}
