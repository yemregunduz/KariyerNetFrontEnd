import { query } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ilan } from 'src/app/models/ilan';
import { IlanDetayDto } from 'src/app/models/ilanDetayDto';
import { IlanService } from 'src/app/services/ilan.service';

@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.css']
})
export class IlanComponent implements OnInit {

  constructor(private ilanService:IlanService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router) { }
  ilanlar:IlanDetayDto[]=[]
  toplamKayit:number=0
  sayfa:number=0
  

  
  
  ngOnInit(): void {
    
    this.getAllIlanDetayDto()
      
      
  }
  
  getAllIlanDetayDto(){
    this.ilanService.getAllIlanDetayDto().subscribe(response=>{
      this.ilanlar=response.data
      this.toplamKayit=response.data.length
    })
  }
  getAllIlanDetayDtoByPozisyonId(pozisyonId:number){
    this.ilanService.getAllIlanDetayDtoByPozisyonId(pozisyonId).subscribe(response=>{
      this.ilanlar=response.data
      this.toplamKayit=response.data.length
    })
  }
  detay()
  {
    if(!sessionStorage.getItem("token")){
      this.toastrService.error("Giriş yapmalısınız.","Hata!")
    }
  }
  basvur()
  {
    if(!sessionStorage.getItem("token")){
      this.toastrService.error("Giriş yapmalısınız.","Hata!")
    }
  }
  getAllIlanDetayDtoBySearchParameters()
  {
    this.ilanlar=JSON.parse(sessionStorage.getItem("ilanlar"))
  }
  onPageChange(page: number)
  {
    this.sayfa = page;
    window.scrollTo(0, 0);
  }
  
  

}
