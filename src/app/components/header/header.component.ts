import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Subscription} from 'rxjs'
import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit , OnDestroy {
constructor(private authService : AuthServiceService , public router : Router){
  console.log(this.isloggedIn)
}
isloggedIn:boolean = false;


// loginBtn(){
// debugger
// if(localStorage.getItem("userrole") !== null){
// this.isloggedIn = true;
// }else{
//   this.isloggedIn = false; 
// }
// }
logout(){
  debugger
  console.log('Logout Initiated')
  this.authService.logout().subscribe(
    {next:()=>{
    this.router.navigate(['/home']);
  },
  error:(error:any)=>{
   console.log('Logout Failed') 
  }
 });
 this.isloggedIn = false;
}



private loginstatusSubscription:Subscription | undefined;

ngOnInit(){
if(localStorage.getItem("userrole") !== null){
  this.isloggedIn = true;
  }else{
    this.isloggedIn = false; 
  }
this.loginstatusSubscription = this.authService.loginstatus$.subscribe((res:any)=>{
this.isloggedIn = res;
console.log('Login Status Updated',res)

})

}

ngOnDestroy(){
  this.loginstatusSubscription?.unsubscribe();
}

}
