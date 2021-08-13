import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdayGonderiDetayDto } from '../models/adayGonderiDetayDto';
import { Gonderi } from '../models/gonderi';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class GonderiService {

  apiUrl="https://localhost:44352/api/gonderiler/"
  constructor(private httpClient:HttpClient) { }

  getAllAdayGonderiDetayDto(takipEdilenId:number,startIndex:number,countOfQuery:number){
    let newPath = this.apiUrl+"getalladaygonderidetaydto?takipEdilenId="+takipEdilenId + "&startIndex="+startIndex+"&countOfQuery="+countOfQuery
    return this.httpClient.get<ListResponseModel<AdayGonderiDetayDto>>(newPath)
  }
  getAllAdayGonderiDetayDtoByAdayId(takipEdilenId:number,startIndex:number,countOfQuery:number,adayId:number){
    let newPath=this.apiUrl+"getalladaygonderidetaydtobyadayid?startIndex="+startIndex+"&countOfQuery"+countOfQuery+"&adayId="+adayId
    return this.httpClient.get<ListResponseModel<AdayGonderiDetayDto>>(newPath)
  }
  addGonderi(gonderi:Gonderi){
    let newPath= this.apiUrl+"add";
    return this.httpClient.post(newPath,gonderi)
  }
  deleteGonderi(gonderiModel:any){
    
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,gonderiModel)
  }
}
