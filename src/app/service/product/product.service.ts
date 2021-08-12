import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  save(product: Product): Observable<Product> {
    product.category = {
      id: product.category
    };
    return this.http.post<Product>(`${API_URL}products`, product);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}products`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}products/${id}`);
  }

  updateById(id: number, product: Product): Observable<Product> {
    product.category = {
      id: product.category
    };
    return this.http.put<Product>(`${API_URL}products/${id}`, product);
  }

  deleteById(id: number): Observable<Product> {
    return this.http.delete(`${API_URL}products/${id}`);
  }
}
