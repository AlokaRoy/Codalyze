import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../types/model';
import { DataFetchService } from './data-fetch.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private productData = new BehaviorSubject(null);
  private productDataObservable = this.productData.asObservable();

  constructor(private dataFetchService: DataFetchService) {
    this.dataFetchService.getJSON().subscribe(data => {
      this.setData({ products: data });
    });
  }

  getData() {
    return this.productDataObservable;
  }

  setData(data: Products) {
    this.productData.next(data)
  }
}
