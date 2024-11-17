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
import { OperationRequestService } from '../../services/operationRequest.service';
import { OperationRequest } from '../../model/operationRequest.model';

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

  constructor(
    private roomService: RoomService,
    private opReqService: OperationRequestService
  ) {

  }


  rooms: Room[] = [];
  roomNumbers: string[] = [];
  message: Message[] = [];
  opRequest: OperationRequest[] = [];


  selectedRoomNumber: string = '';
  date1: Date | undefined;



  stateOptions: any[] = [
    { label: 'Best Planning', value: 'best' },
    { label: 'Good Planning', value: 'good' },
  ];
  value: string = 'off';
  cities!: City[];
  selectedCities!: City[];

  ngOnInit() {

    this.roomService.getRoomList().subscribe((room) => {
      this.rooms = room.map(r => ({
        ...r
      }));

      console.log(this.rooms);

      const numbers: string[] = []

      this.rooms.forEach((roomN) => numbers.push(roomN.roomNumber));
      this.roomNumbers = numbers;

      this.rooms.forEach((room, index) => {

        if (room.maintenanceSlots) {
          const duration = this.calculateMaintenanceDifference(room.maintenanceSlots);
          console.log(`Maintenance duration for Room ${index + 1}: ${duration} minutes`);
        }
      });

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

  onRoomNumberChange() {
    if (this.selectedRoomNumber && this.date1) {
      this.getOperationTypeList();
    }
  }

  onDateChange() {
    if (this.selectedRoomNumber && this.date1) {
      this.getOperationTypeList();
    }
  }

  getOperationTypeList() {
    if (!this.selectedRoomNumber || !this.date1) {
      return;
    }
    
    this.opReqService.getOperationRequestList().subscribe((opReq) => {
      this.opRequest = opReq;
      console.log(this.opRequest);
    });
  }

  calculateMaintenanceDifference(maintenanceSlots: string[]): number {
    if (!maintenanceSlots || maintenanceSlots.length === 0) {
      return 0;
    }

    const slotString = maintenanceSlots[0];

    if (!slotString || typeof slotString !== 'string' || slotString.trim() === '') {
      return 0;
    }

    const [start, end] = slotString.split(' - ');

    const startDate = new Date(
      start.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
    );
    const endDate = new Date(
      end.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
    );

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error(`Invalid maintenance slot format: ${slotString}`);
      return 0;
    }

    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    return duration;
  }

}
