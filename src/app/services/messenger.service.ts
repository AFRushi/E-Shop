import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject  = new Subject();

  constructor() { }

  sentProduct(product){
    // console.log(product);
    this.subject.next(product);
  }

  getProduct(){
    return this.subject.asObservable();
  }
}