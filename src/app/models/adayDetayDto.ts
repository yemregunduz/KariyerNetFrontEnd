import { Byte } from "@angular/compiler/src/util"

export class AdayDetayDto{
    adayId:number
    ad:string
    soyad:string
    tcNo:string
    dogumYili:string
    sehirId:number
    sehirAdi:string
    adayTelNo:string
    email:string
    adayAdres:string
    adayGithub:string
    adayFacebook:string
    adayInstagram:string
    adayImagePath:string
    adayTwitter:string
    adayLinkedin:string
    okulBolumId:number
    bolumId:number
    okulId:number
    bolumAdi:string
    okulAdi:string
    okulGirisTarih:Date
    okulCikisTarih:Date
    pozisyonId:number
    pozisyonAd:string
    pozisyonImagePath:string
    sirketId:number
    sirketAdres:string
    sirketTelNo:string
    sirketSektor:string
    sirketAdi:string
    sirketImagePath:string
    adayYabanciDilId:number
    yabanciDilId:number
    yabanciDilAd:number
    yabanciDilSeviye:number
    okulImagePath:string
    okulTip:string
    sifreHash:Byte[]
    sifreSalt:Byte[]

}