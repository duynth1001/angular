import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ConfigService } from './services/config.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private configService:ConfigService,
    private router:Router
  ){
  }
  ngOnInit(): void {
      // this.router.events.subscribe((event)=>{
      //   console.log(event);
      // });
      this.router.events.pipe(
        filter((event)=>event instanceof NavigationStart)
      ).subscribe((event)=>{
        console.log('Navigation started:');
      });
      this.router.events.pipe(
        filter((event)=>event instanceof NavigationEnd)
      ).subscribe((event)=>{
        console.log('Navigation completed:');
      });
  }  
  title = 'hotelinventory';
}
