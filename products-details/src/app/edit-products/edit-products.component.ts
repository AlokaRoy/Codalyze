import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { pricingInfo, Products } from '../types/model';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  private editProductForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    weight: new FormControl("", [Validators.required]),
    availability: new FormControl(""),
    productUrl: new FormControl("", [Validators.required]),
    priceTier: new FormControl("", [Validators.required]),
    priceRange: new FormControl("", [Validators.required]),
    isEditable: new FormControl("")
  });

  private dropdownData = pricingInfo;
  private dropdownValues = [];
  private productData: Products = {
    products: []
  };

  constructor(private router: Router, private dataStoreService: DataStoreService) {
    this.dataStoreService.getData().subscribe(products => {
      this.productData = products;
    });
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.dropdownValues = this.dropdownData[this.editProductForm.value.priceTier];
  }

  submitForm() {
    this.setData();
    console.log(this.productData)
    this.dataStoreService.setData(this.productData);
    this.router.navigateByUrl('/display-products');

  }

  setData() {
    this.productData.products.forEach(data => {
      if (data.name == this.editProductForm.value.name) {
        data.weight = this.editProductForm.value.weight;
        data.availability = this.editProductForm.value.availability;
        data.productUrl = this.editProductForm.value.productUrl;
        data.pricingTier = this.editProductForm.value.pricingTier;
        data.priceRange = this.editProductForm.value.priceRange;
        data.isEditable = this.editProductForm.value.isEditable;
      }
    })
  }

}
