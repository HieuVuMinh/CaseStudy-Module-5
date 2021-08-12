import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Product} from '../../model/product';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};
  categoryList: Category[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getById(id);
    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  getById(id) {
    this.productService.getById(id).subscribe(product => {
      this.product = product;
      this.productForm = new FormGroup({
        name: new FormControl(this.product.name, [Validators.required, Validators.minLength(6)]),
        price: new FormControl(this.product.price, Validators.required),
        description: new FormControl(this.product.description),
        category: new FormControl(this.product.category.id)
      });
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  updateProduct(id) {
    return this.productService.updateById(id, this.productForm.value).subscribe(() => {
      console.log(this.productForm.value);
      alert('Update thành công');
    });
  }
}
