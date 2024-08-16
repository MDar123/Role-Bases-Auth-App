import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,catchError,throwError,map,of,Subject,tap } from 'rxjs';
import { Users } from '../types/users';
import JSON from 'json5'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

constructor(private http : HttpClient) { }
apiUrl="http://localhost:3000/Users";

userList:Users[]=[];


private loginstatusSubject = new Subject<boolean>();
loginstatus$ = this.loginstatusSubject.asObservable();

updateLoginStatus(isLoggedIn:boolean){
this.loginstatusSubject.next(isLoggedIn)  
}
// Creating All Api methods

//  ---start---

getAllUsers():Observable<Users[]>{
return this.http.get<Users[]>(this.apiUrl);
}
//  ---end---

//Get users by id

//  ---start---

getUserById(id:string){
return this.http.get<Users>( `${(this.apiUrl)}/${id}`).pipe(catchError((error:any)=>{
return throwError('User Not Found!')  
}));
}

//  ---end---

//Create User

//  ---start---

createUser(Userdata:any){
return this.http.post<Users>(this.apiUrl , Userdata);
}

//  ---end---

// Update User

//  ---start---

updateUser(id:any,Userdata:Users){
return this.http.put<Users>(`${this.apiUrl}/${id}`,Userdata);
}

//  ---end---

//Delete User using Delete Method

//  ---start---

deleteUser(id:string){
return this.http.delete(`${this.apiUrl}/${id}`);
}

//  ---end---

// Islogged In method

//   ---start---

isLoggedIn(){
  return localStorage.getItem('username') !== null;
}
//  ---end---

//  ---start---
getUserRole(){
  const role = localStorage.getItem('userrole');
  return role !== null ? role.toString(): ''
}

//  ---end---

//  ---start---

login(id:string, password:string):Observable<any>{
return this.getUserById(id).pipe(
tap((res:any)=>{
if(res && res.password === password && res.isActive){
localStorage.setItem('username',res.id);
localStorage.setItem('userrole',res.role);
this.updateLoginStatus(true);
return {success:true, role:res.role};
}else{
  return {
    success:false,
    message:'Invalid Credentials or User Inactive'
  }
}
}),
catchError((error:any)=>{
return throwError('User Not Found !');
})
)
}

//  ---end

// logout method

//  ---start---

logout():Observable<any>{
debugger
console.log('session',localStorage);
this.updateLoginStatus(true);
localStorage.clear();
return of({success:true , role:''})
}

//  ---end---
}
