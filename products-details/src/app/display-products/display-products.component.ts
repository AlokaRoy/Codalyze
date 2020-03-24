import { Component, OnInit } from '@angular/core';
import { Products, Product } from '../types/model';
import { Router } from '@angular/router';
import { DataStoreService } from '../services/data-store.service';
import { DataFetchService } from '../services/data-fetch.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  productsToDisplay: Product[];

  constructor(private dataService: DataStoreService, private router: Router, private dataFetchService: DataFetchService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      if (data)
        this.productsToDisplay = data.products;
    });
  }

  navigateToEdit(id: number) {
    this.router.navigateByUrl(`/edit-products/${id}`);
  }

}
