import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdayGirisDto } from '../models/adayGirisDto';
import { AdayKayitDto } from '../models/adayKayitDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl="https://localhost:44352/api/auth/"
  constructor(private httpClient:HttpClient) { }
  adayGiris(adayGirisDto:AdayGirisDto){
    let newPath=this.apiUrl+"adaygiris"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,adayGirisDto)
  }
  adayKayit(adayKayitDto:AdayKayitDto){
    let newPath=this.apiUrl+"adaykayit"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,adayKayitDto)
  }
  isAuthenticated(){
    if(sessionStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
