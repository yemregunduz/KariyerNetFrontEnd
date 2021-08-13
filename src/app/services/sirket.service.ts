import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Sirket } from '../models/sirket';

@Injectable({
  providedIn: 'root'
})
export class SirketService {

  apiUrl="https://localhost:44352/api/sirketler/"
  constructor(private httpClient:HttpClient) { }

  getAll(){
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Sirket>>(newPath);
  }
}
