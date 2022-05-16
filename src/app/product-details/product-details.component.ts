import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public name="Hê Nô";
  constructor() { }

  ngOnInit(): void {
  }
  public resetname():void {
    console.log("Check click");
}
}
