import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { EmailvalidatorDirective } from '../emailvalidator/emailvalidator.directive';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,HoverDirective,EmailvalidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private route:Router,private loginService:LoginService){

  }
  email:string='';
  password:string='';
  Login(){
    if(this.loginService.Login(this.email,this.password)){
      this.route.navigate(['/rooms']);
    }
    else
    {
      alert("Invalid Credentials");
    }
  }
}
