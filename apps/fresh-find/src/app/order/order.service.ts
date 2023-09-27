import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from './order.models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private dbUrl = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.dbUrl);
  }

  addOrder(newOrder: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.dbUrl, newOrder);
  }
}
