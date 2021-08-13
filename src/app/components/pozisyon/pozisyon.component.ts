import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdayGonderiDetayDto } from 'src/app/models/adayGonderiDetayDto';
import { Ilan } from 'src/app/models/ilan';
import { IlanDetayDto } from 'src/app/models/ilanDetayDto';
import { Isveren } from 'src/app/models/isveren';
import { IsverenDetayDto } from 'src/app/models/isverenDetayDto';
import { Pozisyon } from 'src/app/models/pozisyon';
import { Sehir } from 'src/app/models/sehir';
import { GonderiService } from 'src/app/services/gonderi.service';
import { IlanService } from 'src/app/services/ilan.service';
import { IsverenService } from 'src/app/services/isveren.service';
import { PozisyonService } from 'src/app/services/pozisyon.service';
import { SehirService } from 'src/app/services/sehir.service';



@Component({
  selector: 'app-pozisyon',
  templateUrl: './pozisyon.component.html',
  styleUrls: ['./pozisyon.component.css'] 
})
export class PozisyonComponent implements OnInit {

  pozisyonlar:Pozisyon[]=[];
  sehirler:Sehir[]=[];
  searchIlanForm:FormGroup
  ilanlar:IlanDetayDto[]=[]
  isverenler:IsverenDetayDto[]=[]
  selectedSehir=0
  
  constructor(private pozisyonService:PozisyonService,private ilanService:IlanService,private activatedRoute :ActivatedRoute,private sehirService:SehirService,
    private formBuilder:FormBuilder,private isverenService:IsverenService,private router:Router,private gonderiService:GonderiService) { }
  ngOnInit(): void {
    this.getAllPozisyonlar();  
    this.createSearchIlanForm();
    this.getAllSehirler();
    this.getAllIsverenDetayDtoBySehirId()
    this.removeItemFromStorage();
    
    
    
  }
  getAllPozisyonlar(){
    this.pozisyonService.getAll().subscribe(response=>{
      this.pozisyonlar=response.data
    })
  }
  getAllSehirler(){
    this.sehirService.getAll().subscribe(response=>{
      this.sehirler=response.data
    })
  }
  createSearchIlanForm(){
    this.searchIlanForm=this.formBuilder.group({
      sehirId:["0"],
      pozisyonId:["0"],
      isverenId:["0"]
    })
  }
  getAllIlanBySerchParameters(){
    if(this.searchIlanForm.valid){
      
      let searchParameterModel=Object.assign({},this.searchIlanForm.value)
      this.ilanService.getAllIlanDetayDtoBySearchParameters(searchParameterModel).subscribe(response=>{
        this.ilanlar=response.data
        sessionStorage.setItem("ilanlar",JSON.stringify(this.ilanlar))
        this.router.navigate(["/ilanlar/searchbyparameter"]).then(()=>{
          window.location.reload()
        })
      })
    } 
  }
  getAllIsverenDetayDto(){
    this.isverenService.GetAllIsverenDetayDto().subscribe(response=>{
      this.isverenler=response.data
    })
  }
  getAllIsverenDetayDtoBySehirId(){
    
    this.isverenService.GetAllIsverenDetayDtoBySehirId(this.selectedSehir).subscribe(response=>{
      this.isverenler=response.data;
    })
  }
  removeItemFromStorage(){
    sessionStorage.removeItem("ilanlar")
  }
  

  
}
