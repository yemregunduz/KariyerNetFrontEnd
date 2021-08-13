import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { YorumDetayDto } from '../models/yorumDetayDto';

@Injectable({
  providedIn: 'root'
})
export class YorumService {

  apiUrl="https://localhost:44352/api/yorumlar/"
  constructor(private httpClient:HttpClient) { }
  getAllYorumDetayDtoByGonderiId(gonderiId:number){
    let newPath=this.apiUrl+"getallyorumdetaydtobygonderiid?gonderiId="+gonderiId
    return this.httpClient.get<ListResponseModel<YorumDetayDto>>(newPath)
  }
  
}
