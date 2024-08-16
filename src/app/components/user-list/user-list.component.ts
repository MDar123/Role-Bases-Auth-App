import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Users } from '../../types/users';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

constructor(private authService:AuthServiceService){}

users:Users[]=[];

ngOnInit(){
  this.authService.getAllUsers().subscribe((user:Users[])=>{
  this.users = user;
  },
  (error: any)=>{
    console.error('Error Fetching User List', error)
  }
  );
}

// calling delete button from service

//  ---start---
deleteBtn(){
alert('Delete Button functionality is Not made Yet')
}
//  ---end---


// Calling updateUser Function to update data

editBtn(){
alert('Edit Functionality is not Made Yet');
}
}
