import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { YetenekTip } from '../models/yetenekTip';

@Injectable({
  providedIn: 'root'
})
export class YetenekTipService {

  apiUrl="https://localhost:44352/api/yetenektipler/"
  constructor(private httpClient:HttpClient) { }
  getAll(){
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<YetenekTip>>(newPath)
  }
}
