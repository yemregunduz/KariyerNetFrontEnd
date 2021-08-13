import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Sehir } from '../models/sehir';

@Injectable({
  providedIn: 'root'
})
export class SehirService {

  apiUrl="https://localhost:44352/api/sehirler/"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Sehir>>
  {
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Sehir>>(newPath);
  }
}
