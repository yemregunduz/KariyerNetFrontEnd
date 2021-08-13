import { Byte } from "@angular/compiler/src/util";

export interface Isveren{
    id:number,
    sirketAd:string,
    webSite:string,
    telNo:string,
    email:string,
    sifreSalt:Byte[]
    sifreHash:Byte[]
}