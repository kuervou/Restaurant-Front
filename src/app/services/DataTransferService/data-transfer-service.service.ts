import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private ordenData = new BehaviorSubject<any>(null);
  ordenData$ = this.ordenData.asObservable();

  setOrdenData(data: any) {
    this.ordenData.next(data);
  }

}
