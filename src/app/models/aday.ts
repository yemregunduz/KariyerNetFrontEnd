import { Byte } from "@angular/compiler/src/util";


export interface Aday {
    id:number,
    ad:string,
    soyad:string,
    tcNo:string,
    adayTelNo:string,
    adayAdres:string,
    okulBolumId:number,
    okulGirisTarih:Date,
    okulCikisTarih:Date,
    adayImagePath:string,
    sehirId:string,
    adayFacebook:string,
    adayInstagram:string,
    adayLinkedin:string,
    adayTwitter:string,
    adayGitHub:string,
    dogumYili:number,
    email:string,
    sifreSalt:Byte[]
    sifreHash:Byte[]

}