import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from './booking.service';
import { merge, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@Component({
  selector: 'app-booking',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  constructor(
    private configService: ConfigService,
    private bookingService: BookingService,
    private fb: FormBuilder,
    private route:ActivatedRoute
  ) {}

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-Feb-2023'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      tnc: false,
      guestName: '',
      guests: [],
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
    });
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        { value: roomId, disabled: true },
        { validators: [Validators.required] }
      ),
      guestEmail: ['', { validators: [Validators.required, Validators.email] }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [
        '',
        {
          updateOn: 'blur',
        },
      ],
      tnc: new FormControl(false, Validators.requiredTrue),
      guestName: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5),CustomValidator.ValidateSpeak('*')],
        },
      ],
      guests: this.fb.array([
        this.fb.group({
          guestName: [''],
          age: new FormControl(''),
        }),
      ]),
      address: this.fb.group({
        addressLine1: ['', { validators: [Validators.required] }],
        addressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
    },{
      updateOn: 'blur',
      validators: [CustomValidator.validateDate],
    });
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data)=>{
    //   this.bookingService.bookRoom(data).subscribe((response)=>{
    //     console.log(response);
    //   })
    // })
    this.bookingForm.valueChanges.pipe(
      switchMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data)=>{
      console.log(data);
    });
  }
  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{
    //   console.log(data)
    // })
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      tnc: false,
      guestName: '',
      guests: [],
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
    });
  }
  addGuest() {
    this.guests.push(
      this.fb.group({
        guestName: ['', { validators: [Validators.required] }],
        age: new FormControl(''),
      })
    );
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
