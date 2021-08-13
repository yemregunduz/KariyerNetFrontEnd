import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdayYetenekDetaydto } from '../models/adayYetenekDetayDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AdayYetenekService {

  apiUrl="https://localhost:44352/api/adayyetenekler/"
  constructor(private httpClient:HttpClient) { }
  getAllAdayYetenekDetayDtoByAdayId(adayId:number){
    let newPath=this.apiUrl+"getalladayyetenekdetaydtobyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<AdayYetenekDetaydto>>(newPath)
  }
  getAllAdayYetenekDetayDtoByAdayIdAndYetenekTipId(adayId:number,yetenekTipId:number){
    let newPath=this.apiUrl+"getalladayyetenekdetaydtobyadayidandyetenektipid?adayId="+adayId+"&yetenekTipId="+yetenekTipId
    return this.httpClient.get<ListResponseModel<AdayYetenekDetaydto>>(newPath)
  }
  addAdayYetenek(adayYetenekModel:any){
    let newPath=this.apiUrl+"add"
    return this.httpClient.post(newPath,adayYetenekModel)
  }
  deleteAdayYetenek(adayYetenekModel:any){
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post(newPath,adayYetenekModel)
  }
  yetenekAlreadyExist(adayId:number,yetenekId:number){
    let newPath=this.apiUrl+"yetenekexist?adayId="+adayId+"&yetenekId="+yetenekId
    return this.httpClient.get<ResponseModel>(newPath)
  }
}
