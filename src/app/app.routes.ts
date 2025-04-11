import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { loginGuard } from './guards/login.guard';
import { roomGuard } from './rooms/guards/room.guard';
import { bookingGuard } from './booking/validators/guards/booking.guard';
import { commentGuard } from './comment/guard/comment.guard';

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent,canActivate:[loginGuard] },
  {
    path: 'rooms',
    loadComponent: () => import('./rooms/rooms.component').then(m => m.RoomsComponent), // Lazy load RoomsComponent
    children: [
      {
        path: 'add',
        loadComponent: () => import('./rooms/room-add/room-add.component').then(m => m.RoomAddComponent) // Lazy load RoomAddComponent
      },
      // {
      //   path: ':roomid',
      //   loadComponent: () => import('./rooms/rooms-booking/rooms-booking.component').then(m => m.RoomsBookingComponent) // Lazy load RoomsBookingComponent
      // }
    ],
    canActivate:[loginGuard],
    canActivateChild:[roomGuard], // Apply guard to child routes as well
  },
  { path: 'login', component: LoginComponent },
  { path: 'booking/:roomid', loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent) ,
    canDeactivate:[bookingGuard], // Apply guard to BookingComponent
  }, // Lazy load BookingComponent
  {
    path:'comments', loadComponent:()=>import('./comment/comment.component').then(m=>m.CommentComponent),
    resolve:{comment:commentGuard}
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
