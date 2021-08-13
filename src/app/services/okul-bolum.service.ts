import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { OkulBolum } from '../models/okulBolum';
import { OkulDetayDto } from '../models/okulDetayDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OkulBolumService {

  apiUrl="https://localhost:44352/api/okulbolumler"
  constructor(private httpClient:HttpClient) { }
  AddWithReturnOkulBolum(okulBolum:any){
    let newPath=this.apiUrl+"/addreturnokulbolumid"
    return this.httpClient.post<SingleResponseModel<OkulBolum>>(newPath,okulBolum)
  }
  GetAllOkulBolumByOkulId(okulId:number){
    let newPath=this.apiUrl+"/getallokulbolumbyokulid?okulId="+okulId
    return this.httpClient.get<ListResponseModel<OkulDetayDto>>(newPath)
  }
}
