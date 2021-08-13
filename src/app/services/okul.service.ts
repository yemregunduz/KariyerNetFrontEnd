import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Okul } from '../models/okul';

@Injectable({
  providedIn: 'root'
})
export class OkulService {

  apiUrl="https://localhost:44352/api/okullar/"
  constructor(private httpClient:HttpClient) { }
  getAllOkullar(){
    let newPath=this.apiUrl+"getAll"
    return this.httpClient.get<ListResponseModel<Okul>>(newPath);
  }
}
