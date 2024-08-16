import { CanActivateFn,Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import {inject} from '@angular/core'
export const authGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
const service = inject(AuthServiceService);

if(service.isLoggedIn()){
debugger
const userRole = service.getUserRole();
console.log(route.data['role']);
console.log(userRole);

if(route.data['role'] && route.data['role'].indexOf(userRole)=== -1){ 
debugger
alert('Access Denied');
return false;

}else{
return true;
}

}
else{
console.log('User Not Logged In. Please LogIn')
alert('User Not logged in');
router.navigate(['/login']);
return false
}
};
