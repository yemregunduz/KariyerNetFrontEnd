import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilan } from '../models/ilan';
import { IlanDetayDto } from '../models/ilanDetayDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SearchParameter } from '../models/searchParameter';

@Injectable({
  providedIn: 'root'
})
export class IlanService {
  apiUrl="https://localhost:44352/api/ilanlar/"
  constructor(private httpClient:HttpClient) { }

  getIlanlar():Observable<ListResponseModel<Ilan>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Ilan>>(newPath);
  }
  getAllIlanByPozisyonId(pozisyonId:number):Observable<ListResponseModel<Ilan>>{
    let newPath=this.apiUrl+"getallilanbypozisyonid?pozisyonId="+pozisyonId;
    return this.httpClient.get<ListResponseModel<Ilan>>(newPath);
  }
  getAllIlanDetayDto():Observable<ListResponseModel<IlanDetayDto>>{
    let newPath=this.apiUrl+"getallilandetaydto";
    return this.httpClient.get<ListResponseModel<IlanDetayDto>>(newPath)
  }
  getAllIlanDetayDtoByPozisyonId(pozisyonId:number):Observable<ListResponseModel<IlanDetayDto>>{
    let newPath=this.apiUrl+"getallilandetaydtobypozisyonid?pozisyonId="+pozisyonId;
    return this.httpClient.get<ListResponseModel<IlanDetayDto>>(newPath);
  }
  getAllIlanDetayDtoBySearchParameters(searchParameterModel:SearchParameter):Observable<ListResponseModel<IlanDetayDto>>{
    let newPath=this.apiUrl+"getallilandetaydtobysearchparameters?sehirId="+searchParameterModel.sehirId+"&isverenId="+searchParameterModel.isverenId+"&pozisyonId="+searchParameterModel.pozisyonId
    return this.httpClient.get<ListResponseModel<IlanDetayDto>>(newPath)
  }
}
