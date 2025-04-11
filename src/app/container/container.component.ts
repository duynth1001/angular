import { AfterContentInit, Component, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  // providers:[RoomsService]
})
export class ContainerComponent implements AfterContentInit{

  @ContentChild(EmployeeComponent) employee!:EmployeeComponent;

  constructor()
  {

  }

  ngAfterContentInit(){
    console.log(this.employee);
    this.employee.empName='Rick'
    
  }
}
