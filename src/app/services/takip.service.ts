import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Takip } from '../models/takip';
import { TakipClassModel } from '../models/takipClassModel';
import { TakipDetayDto } from '../models/takipDetayDto';

@Injectable({
  providedIn: 'root'
})
export class TakipService {

  apiUrl="https://localhost:44352/api/takipler/"
  constructor(private httpClient:HttpClient) { }
  AddTakip(takip:Takip){
    let newPath=this.apiUrl+"add"
    return this.httpClient.post(newPath,takip);
  }
  DeleteTakip(takip:Takip){
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post(newPath,takip);
  }
  GetAllTakipcilerByAdayId(adayId:number){
    let newPath=this.apiUrl+"getalltakipcilerbyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<TakipDetayDto>>(newPath)
  }
  GetAllTakipEdilenlerByAdayId(adayId:number){
    let newPath=this.apiUrl+"getalltakipedilenlerbyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<TakipDetayDto>>(newPath);
  }
  checkIfUserAlreadyFollow(takipciId:number,takipEdilenId:number){
    let newPath=this.apiUrl+"checkifuseralreadyfollow?takipciId="+takipciId+"&takipEdilenId="+takipEdilenId
    return this.httpClient.get<ResponseModel>(newPath)
  }
  getTakipByTakipciAndTakipEdilenId(takipciId:number,takipEdilenId:number){
    let newPath=this.apiUrl+"gettakipbytakipciandtakipedilenid?takipciId="+takipciId+"&takipEdilenId="+takipEdilenId
    return this.httpClient.get<TakipClassModel>(newPath);
  }
  getAllTakipEdilenlerTopThreeByAdayId(adayId:number){
    let newPath=this.apiUrl+"getalltakipedilenlertopthreebyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<TakipDetayDto>>(newPath)
  }
  
}
