import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { CartService } from '../services/cart.service';
import { TotalService } from '../services/total.service';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css'
})
export class SportComponent implements OnInit{
  sports: Sport[] = [];
  message!: string;
  addMessage: number = 0;
  totalSport!: number;
  totalSeatSport!: number;
  totalFromService: number = 0;
  totalSeatFromService: number = 0;
  nbSeatValue: number = 0;

  userInput: { [id: number]: number } = {};


  constructor(
    private cartService: CartService,
    private sportService: SportService,
    private totalService: TotalService
    ) {}


  ngOnInit() {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  onKeyUp(filterText: string) {
    this.sports = this.sports.filter(item => item.name.toLowerCase().includes(filterText));
  }


}
