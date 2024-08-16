import { Component ,ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule, } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import { AuthServiceService } from '../../services/auth-service.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule,RouterModule,MatButtonModule,MatInputModule,MatCardModule,MatSnackBarModule,MatFormFieldModule,MatSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private auth : AuthServiceService , private router : Router , private fb : FormBuilder , private snackbar : MatSnackBar){}


// Making Login From using FormBuilder Service

//  ---start---

loginForm = this.fb.group({
id:['',[Validators.required , Validators.minLength(5)]],
password:['',[Validators.required , Validators.minLength(5)]]
})

//  ---end---

// confirm login method \

//  ---start---

confirmLogin(){
debugger
if(this.loginForm.valid){
const loginId:any = this.loginForm.value.id;
const loginpassword:any = this.loginForm.value.password;
this.auth.login(loginId,loginpassword).subscribe((res:any)=>{
if(res){
this.router.navigateByUrl('/home')
}
});
}
}

//  ---end---

}
