import { Byte } from "@angular/compiler/src/util";

export interface SistemPersonel{
    id:number,
    pozisyonId:number,
    email:string,
    sifreSalt:Byte[],
    sifreHash:Byte[],
}