import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RoomsService } from '../services/rooms.service';
@Component({
  selector: 'app-room-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css',
})
export class RoomAddComponent {
  room: RoomList = {
    roomType: '',
    amenitites: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMessage: string = '';
  constructor(private roomsService: RoomsService) {}
  AddRoom(roomsForm:NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.resetForm({
        roomType: '',
        amenitites: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}
