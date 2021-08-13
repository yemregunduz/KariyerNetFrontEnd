import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Aday } from '../models/aday';
import { AdayDetayDto } from '../models/adayDetayDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdayService {
  apiUrl="https://localhost:44352/api/adaylar"

  constructor(private httpClient:HttpClient) { }
  getAllAday():Observable<ListResponseModel<Aday>>{
    let newPath=this.apiUrl+"/getall"
    return this.httpClient.get<ListResponseModel<Aday>>(newPath)
  }
  getAdayCvTecrubeDtoByAdayId(adayId:number):Observable<SingleResponseModel<AdayDetayDto>>{
    let newPath=this.apiUrl+"/getadaycvtecrubedtobyadayid?adayId="+adayId;
    return this.httpClient.get<SingleResponseModel<AdayDetayDto>>(newPath)
  }
  updateAdayIletisimBilgileri(aday:Aday){
    let newPath=this.apiUrl+"/updateadayiletisimbilgileri"
    return this.httpClient.post<SingleResponseModel<Aday>>(newPath,aday)
  }
  updateAdaySosyalMedyaBilgileri(aday:Aday){
    let newPath= this.apiUrl+"/updateadaysosyalmedyabilgileri"
    return this.httpClient.post<SingleResponseModel<Aday>>(newPath,aday)
  }
  getAllAdaylarByFilterText(filterText:string){
    let newPath=this.apiUrl+"/searchadaylarbyfiltertext?filterText="+filterText
    return this.httpClient.get<ListResponseModel<Aday>>(newPath)
  }
  updateAdayProfilePhoto(aday:Aday){
    let newPath= this.apiUrl+"/updateprofilephoto"
    return this.httpClient.post<SingleResponseModel<Aday>>(newPath,aday)
  }
}
