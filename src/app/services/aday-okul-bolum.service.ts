import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdayOkulBolumDto } from '../models/adayOkulBolumDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdayOkulBolumService {

  apiUrl="https://localhost:44352/api/adayokulbolumler/"
  constructor(private httpClient:HttpClient) { }

  getAllOkulAdayBolumDtoByAdayId(adayId:number)
  {
    let newPath=this.apiUrl+"getalladayokulbolumdtobyadayid?adayId="+adayId
    return this.httpClient.get<ListResponseModel<AdayOkulBolumDto>>(newPath);
  }
  addOkulAday(okulAday:any){
    let newPath=this.apiUrl+"add"
    return this.httpClient.post(newPath,okulAday)
  }
  
}
