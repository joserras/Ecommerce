import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInformationService } from '../../services/user-information.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
}) 
export class RegisterFormComponent implements OnInit {
  
  constructor(private userInformationService: UserInformationService) {
    
  }
  registerForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    password2: new FormControl(null),
    name: new FormControl(null)
  }, { validators: [this.checkPasswords, Validators.required] });

  get registerFormControl() {
    return this.registerForm.controls;
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    if (group.get('password') == null)
      return null;
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value;
    if (pass != confirmPass)
      group.get('password2').setErrors({ passwordMismatch: true });
    else
      group.get('password2').setErrors(null);
    
    return pass === confirmPass ? null : { notSame: true }
  }
  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.valid);
    if (this.registerForm.valid)
    this.userInformationService.register(this.registerForm.value);
  }
}
