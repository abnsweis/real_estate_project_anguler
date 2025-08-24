import { Component, OnInit } from '@angular/core';
import { RealTimeService } from '../../../../core/services/realrime.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  message: string = 's';
  constructor(private realTimeService: RealTimeService) {

  }
  ngOnInit(): void {
    this.realTimeService.startConnection().subscribe(() => {
      this.realTimeService.receivedMessage().subscribe((message) => {
        console.log(message);
      })
    })


  }

  sendMessage() {
    this.realTimeService.sendMessage(this.message);
  }
}
