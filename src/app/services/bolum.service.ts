import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bolum } from '../models/bolum';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BolumService {

  apiUrl="https://localhost:44352/api/bolumler/"
  constructor(private httpClient:HttpClient) { }
  GetAllBolumler(){
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Bolum>>(newPath);
  }
}
