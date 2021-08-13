import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsverenDetayDto } from '../models/isverenDetayDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class IsverenService {

  apiUrl="https://localhost:44352/api/isverenler/"
  constructor(private httpClient:HttpClient) { }
  GetAllIsverenDetayDto():Observable<ListResponseModel<IsverenDetayDto>>{
    let newPath=this.apiUrl+"getallisverendetaydto"
    return this.httpClient.get<ListResponseModel<IsverenDetayDto>>(newPath);
  }
  GetAllIsverenDetayDtoBySehirId(sehirId:number):Observable<ListResponseModel<IsverenDetayDto>>{
    let newPath=this.apiUrl+"getallisverendetaydtobysehirid?sehirId="+sehirId
    return this.httpClient.get<ListResponseModel<IsverenDetayDto>>(newPath);
  }
}
