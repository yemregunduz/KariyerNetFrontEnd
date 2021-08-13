import { Byte } from "@angular/compiler/src/util";

export interface IsverenDetayDto{
    id:number,
    sirketId:number,
    webSite:string,
    telNo:string,
    email:string,
    sehirId:number,
    sehirAdi:string,
    sifreSalt:Byte[],
    sifreHash:Byte[],
    sirketAdi:string,
    adres:string,
    sektor:string,
    sirketTelNo:string
}