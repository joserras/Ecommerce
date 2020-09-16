import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInformationService } from '../../services/user-information.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  //profileForm = new FormGroup({
  //  email: new FormControl('', [Validators.required, Validators.email]),
  //  password: new FormControl('', [Validators.required]),
 
  //});
  //name = new FormControl('');
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl('')
  });
  constructor(private userInformationService: UserInformationService) {

   
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.userInformationService.login(this.profileForm.value);
  }
}
