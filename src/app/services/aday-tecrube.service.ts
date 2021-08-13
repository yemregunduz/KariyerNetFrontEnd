import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdayTecrube } from '../models/adayTecrube';
import { AdayTecrubeDetayDto } from '../models/adayTecrubeDetayDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdayTecrubeService {

  apiUrl="https://localhost:44352/api/adaytecrubeler/"
  constructor(private httpClient:HttpClient) { }
  GetAllAdayTecrubeDetayDtoByAdayId(adayId:number){
    let newPath=this.apiUrl+"getalladaytecrubedetaydtobyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<AdayTecrubeDetayDto>>(newPath)
  }
  addAdayTecrube(adayTecrube:any){
    let newPath=this.apiUrl+"add"
    return this.httpClient.post(newPath,adayTecrube)
  }
  deleteAdayTecrube(adayTecrube:any){
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post(newPath,adayTecrube)
  }
  getAdayTecrubeById(id:number){
    let newPath=this.apiUrl+"getadaytecrubebyid?id="+id
    return this.httpClient.get<SingleResponseModel<AdayTecrube>>(newPath);
  }
}
