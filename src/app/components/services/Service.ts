import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/Customer';

const initID: Customer = {
  id: '',
  name: '',
  status: '',
  extra: '',
};

@Injectable({
  providedIn: 'root',
})
export class Service {
  private baseEndpoint = 'http://localhost:8087/data/v1/listData';
  private baseEndpoint2 = 'http://localhost:8087/data/v1/listData3';

  private id$ = new BehaviorSubject<Customer>(initID);

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient) {}

  public getListData(): Observable<any> {
    return this.http.get(`${this.baseEndpoint}`, { headers: this.headers });
  }

  public getprofiles(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseEndpoint2);
  }

  get selectCustomer$(): Observable<Customer> {
    return this.id$.asObservable();
  }

  setCustomer(cnpj: any): void {
    this.id$.next(cnpj);
  }
}
