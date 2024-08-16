import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth : AuthServiceService , private router : Router , private fb : FormBuilder , private snackbar : MatSnackBar){}

  signUpForm = this.fb.group({
    id:['',[Validators.required , Validators.minLength(5)]],
  name:['',[Validators.required , Validators.minLength(5)]],
    email:['',[Validators.required , Validators.email]],
    password:['',[Validators.required , Validators.minLength(8) , Validators.maxLength(15)]],
    confirmpassword:['',[Validators.required ]],
    role:[''],
    isActive:[false]
    });

// Making Confirm Password Validators :

//  ---start---

confirmedValidator(controlName:string , matchingControlName:string){
return (FormGroup:FormGroup)=>{
const control = FormGroup.controls[controlName];
const matchiControl = FormGroup.controls[matchingControlName];
if(matchiControl.errors && !matchiControl.errors['mismatch']){
return;
}
if(control.value !== matchiControl.value){
matchiControl.setErrors({mismatch:true})
}else{
  matchiControl.setErrors(null);
}
}
}

//  ---end---


// Making register method

//  ---start---

confirmSignUp(){
debugger
if(this.signUpForm.valid){
const {confirmpassword, ...userDetails} = this.signUpForm.value
this.auth.createUser(userDetails).subscribe((res:any)=>{
this.snackbar.open('User Register Successful','',{
  duration:3000
});
this.router.navigate(['login']);
});
}
else{
console.log('Invalid Credentials')
}
}

//  ---end---
}
