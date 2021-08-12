import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';

class Category {
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  categoryList: Category[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', Validators.required),
    description: new FormControl(),
    category: new FormControl()
  });

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.save(this.productForm.value).subscribe(() => {
        alert('Thành Công');
        console.log(this.productForm.value);
      });
    } else {
      alert('Không thành công');
    }
  }

  get name() {
    return this.productForm.get('name');
  }

}
