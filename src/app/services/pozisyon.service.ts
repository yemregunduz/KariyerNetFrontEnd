import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Pozisyon } from '../models/pozisyon';

@Injectable({
  providedIn: 'root'
})
export class PozisyonService {
  apiUrl="https://localhost:44352/api/pozisyonlar/"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Pozisyon>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Pozisyon>>(newPath)
  }
}
