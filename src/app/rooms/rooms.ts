export interface Room{
    totalRooms:number;
    availableRooms:number;
    bookedRooms:number;

}

export interface RoomList{
    roomNumber?:string;
    roomType:string;
    amenitites:string;
    price:number;
    photos:string;
    checkinTime:Date;
    checkoutTime:Date;
    rating:number;
}