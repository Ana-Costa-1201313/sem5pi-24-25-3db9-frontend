import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { RoomService } from '../../services/room.service';
import { Room } from '../../model/room.model';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    SelectButtonModule,
    ListboxModule,
  ],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {

  constructor(private service: RoomService) {

  }


  rooms: Room[] = [];
  roomNumbers: string[] = [];
  message: Message[] = [];


  date1: Date | undefined;
  stateOptions: any[] = [
    { label: 'Best Planning', value: 'best' },
    { label: 'Good Planning', value: 'good' },
  ];
  value: string = 'off';
  cities!: City[];
  selectedCities!: City[];

  ngOnInit() {

    this.service.getRoomList().subscribe((room) => {
      this.rooms = room.map(r => ({
        ...r
      }));

      console.log(this.rooms);

      const numbers: string[] = []

      this.rooms.forEach((roomN) => numbers.push(roomN.roomNumber));
      this.roomNumbers = numbers;
    });



    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.message = [
      {
        severity: 'info',
        summary: '',
        detail: 'The % of total time occupied is X',
      },
    ];
  }
}
