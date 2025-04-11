import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  imports: [CommonModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.css'
})
export class RoomsBookingComponent implements OnInit {
  
  id:number=0;

  id$!:Observable<string|null>;
  constructor(private router:ActivatedRoute){
  this.id$ = this.router.paramMap.pipe(
    map((params) => params.get('roomid'))
  );
  }
  ngOnInit(): void {
    // this.id=this.router.snapshot.params['roomid'];
    // this.id$=this.router.params.pipe(
    //   map((params)=>params['roomid'])
    // );
      // this.router.params.subscribe((params)=>{this.id=params['roomid']});
      // this.router.paramMap.subscribe((params)=>{params.get('roomid')});
  }
}
