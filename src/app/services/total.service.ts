import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  //prix
  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  //places
  private totalSubjectSeat = new BehaviorSubject<number>(0);
  totalSeat$ = this.totalSubjectSeat.asObservable();

  updateTotal(newTotal: number): void {
    this.totalSubject.next(newTotal);
  }

  updateTotalSeat(newTotalSeat: number): void {
    this.totalSubjectSeat.next(newTotalSeat);
  }
}
