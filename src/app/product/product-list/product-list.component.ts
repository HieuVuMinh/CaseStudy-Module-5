import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    return this.productService.getAll().subscribe(productList => {
      this.productList = productList;
    });
  }

  deleteProduct(id) {
    return this.productService.deleteById(id).subscribe(() => {
      alert('Delete thành công');
      this.getAllProduct();
    });
  }
}
