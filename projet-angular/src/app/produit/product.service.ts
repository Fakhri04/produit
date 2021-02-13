import { ProductModel } from './../product-model.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list_url: string = "http://localhost:3000/list";
  persist_url: string = "http://localhost:3000/go";
  delete_url: string = "http://localhost:3000/delete";
  update_url: string = "http://localhost:3000/update";

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.list_url);
  
  }

  persist(data){
    return this.httpClient.post<ProductModel>(this.persist_url,data);
  }
  delete(id){
    return this.httpClient.delete(this.delete_url+'/'+id);
  }
  update(produit){
    return this.httpClient.put(this.update_url+'/'+produit.id,produit);

  }
}

