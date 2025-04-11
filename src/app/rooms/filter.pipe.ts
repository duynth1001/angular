import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(rooms: RoomList[] | null, price: number): RoomList[] {
    if (!rooms) {
      return []; // Return an empty array if rooms is null or undefined
    }
    return rooms.filter((room) => room.price > price);
  }
}
