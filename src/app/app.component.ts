import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms'
import {  HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule,HttpClientModule,RouterModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoleBasedApp';
}
