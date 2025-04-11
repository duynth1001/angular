import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  // providers:[RoomsService]
})
export class EmployeeComponent {

  constructor( private roomsService:RoomsService ){

  }

  empName:string = 'John';
}
