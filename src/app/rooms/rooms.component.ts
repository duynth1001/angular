import { Component, Inject, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { RouteConfigToken } from '../services/routeConfig.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-rooms',
  imports: [CommonModule, RoomsListComponent, HeaderComponent,RouterModule,ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
  providers:[
     {
          provide:RouteConfigToken,
          useValue:{title:'Room'},
    }
  ]
})
export class RoomsComponent {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  priceFilter = new FormControl(0);

  room$: Observable<RoomList[]>;

  error$=new Subject<string>();
  
  getError$ = this.error$.asObservable();

  roomsCount$!: Observable<number>;
  constructor(@SkipSelf()private roomsService:RoomsService,
@Inject(RouteConfigToken) private configService:ConfigService){
  console.log(this.configService); 
    this.roomsCount$= this.roomsService.getRooms$.pipe(
      map((rooms)=>rooms.length)
    )

    this.room$ = this.roomsService.getRooms$.pipe(
      catchError((err)=>{
        // console.log(err);
        this.error$.next(err.message);
        return of ([]);
      })
    );
  }



  roomList: RoomList[] = [];

  stream =new Observable<string>(observer=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  ngDoCheck() {
    console.log('on do Check');
  }

  ngAfterViewInit() {
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.last.title="Last Title";
    
  }

  ngAfterViewChecked() {}

  totalBytes=0;

  subscription!:Subscription;

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event)=>{
    switch (event.type) {
      case HttpEventType.Sent:
        {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader:
          {
            console.log('Request success!');
            break;
          }
        case HttpEventType.DownloadProgress:{
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
        }
    }      
    })

    this.stream.subscribe({
      next:(value)=>console.log(value),
      complete:()=>console.log('complete'),
      error:(err)=>console.log(err)
      
    } )
    
    this.stream.subscribe((data)=>console.log(data))
    // console.log(this.headerComponent);
    //   this.roomsService.getRooms$.subscribe(rooms=>{
    //   this.roomList=rooms
    // });
    
    // this.roomList =

  }

  title = 'Room List';

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }
  selectRoom(room: RoomList) {
    console.log(room);
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenitites: 'Air Conditioner, Free Wifi, TV, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfKSK125-Zl8ekYbIY7cYIPQATyVltU2k81A&s',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data)=>{
      this.roomList = data;
    })
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenitites: 'Air Conditioner, Free Wifi, TV, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfKSK125-Zl8ekYbIY7cYIPQATyVltU2k81A&s',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    this.roomsService.editRoom(room).subscribe((data)=>{this.roomList=data});
  }

  deleteRoom(){
    this.roomsService.delete('3').subscribe((data)=>{this.roomList=data});
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
