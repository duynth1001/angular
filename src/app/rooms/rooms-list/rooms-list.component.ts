import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output,  SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomList } from '../rooms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
@Component({
  selector: 'app-rooms-list',
  imports: [CommonModule,RouterOutlet,RouterLink,FilterPipe],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnDestroy{

  @Input() rooms: RoomList[] |null=[];

  @Input() title:string ='';
 
  @Output() selectedRoom = new EventEmitter<RoomList>();

  @Input() price=0;

  ngOnChanges(changes:SimpleChanges):void{
    console.log(changes);
    if (changes['title']) {
      this.title=changes['title'].currentValue.toUpperCase();
    }
    
  }

  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }
  ngOnDestroy(): void {
      console.log('on destroy is called');
      
  }
}
