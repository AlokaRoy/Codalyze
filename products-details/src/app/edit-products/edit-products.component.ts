import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { pricingInfo, Products } from '../types/model';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  id: number = null;
  dropdownData = pricingInfo;
  dropdownValues = [];
  productData: Products = {
    products: []
  };
  editProductForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
    weight: new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
    availability: new FormControl("", [Validators.pattern('[0-9]*')]),
    productUrl: new FormControl("", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    priceTier: new FormControl("", [Validators.required]),
    priceRange: new FormControl("", [Validators.required]),
    isEditable: new FormControl("")
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataStoreService: DataStoreService) {
    this.activatedRoute.params.subscribe( params => { this.id = params.id} );
    this.dataStoreService.getData().subscribe(products => {
      this.productData = products;
    });
  }
  
  get name() { return this.editProductForm.get('name'); }
  get weight() { return this.editProductForm.get('weight'); }
  get availability() { return this.editProductForm.get('availability'); }
  get productUrl() { return this.editProductForm.get('productUrl'); }
  get priceRange() { return this.editProductForm.get('priceRange'); }    

  ngOnInit() {
   this.editProductForm.setValue({
  name: this.productData.products[this.id].name,
  weight: this.productData.products[this.id].weight,
  availability: this.productData.products[this.id].availability,
  productUrl: null,
  priceTier: null,
  priceRange: 0,
  isEditable: null
   })
  }

  ngDoCheck() {
    this.dropdownValues = this.dropdownData[this.editProductForm.value.priceTier];
  }

  submitForm() {
    this.setData(this.id);
    console.log(this.productData);
    this.dataStoreService.setData(this.productData);
    this.router.navigateByUrl('/display-products');

  }

  setData(id: number) {
    this.productData.products[id].name = this.editProductForm.value.name;
    this.productData.products[id].weight = this.editProductForm.value.weight;
    if(this.editProductForm.value.availability === null || this.editProductForm.value.availability === undefined) {
      this.productData.products[id].availability = 0;
    } else {
      this.productData.products[id].availability = this.editProductForm.value.availability;
    }
    this.productData.products[id].productUrl = this.editProductForm.value.productUrl;
    this.productData.products[id].pricingTier = this.editProductForm.value.pricingTier;
    this.productData.products[id].priceRange = this.editProductForm.value.priceRange;
    this.productData.products[id].isEditable = this.editProductForm.value.isEditable;
  }

}
