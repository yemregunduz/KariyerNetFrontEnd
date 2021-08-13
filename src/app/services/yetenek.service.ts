import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ListResponseModel } from '../models/listResponseModel';
import { YetenekDetayDto } from '../models/yetenekDetayDto';

@Injectable({
  providedIn: 'root'
})
export class YetenekService {

  apiUrl="https://localhost:44352/api/yetenekler/"
  constructor(private httpClient:HttpClient) { }
  getAllYetenekDetayDtoBySearchFilter(filterText:string){
    let newPath=this.apiUrl+"getallyetenekdetaydtobysearchfilter?filterText="+filterText
    return this.httpClient.get<ListResponseModel<YetenekDetayDto>>(newPath)
  }
}
