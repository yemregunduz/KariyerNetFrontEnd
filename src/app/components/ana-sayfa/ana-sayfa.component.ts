import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { AdayDetayDto } from 'src/app/models/adayDetayDto';
import { AdayGonderiDetayDto } from 'src/app/models/adayGonderiDetayDto';
import { TakipDetayDto } from 'src/app/models/takipDetayDto';
import { YorumDetayDto } from 'src/app/models/yorumDetayDto';
import { AdayService } from 'src/app/services/aday.service';
import { GonderiService } from 'src/app/services/gonderi.service';
import { TakipService } from 'src/app/services/takip.service';
import { YorumService } from 'src/app/services/yorum.service';
declare var $:any
@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.css']
  
})
export class AnaSayfaComponent implements OnInit {

  constructor(private gonderiService:GonderiService,private adayService:AdayService,private yorumService:YorumService,
    private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder,private toastrService:ToastrService,private takipService:TakipService,private changeDetection:ChangeDetectorRef) {  }

  gonderiler:AdayGonderiDetayDto[]=[]
  yorumlar:YorumDetayDto[]
  aday:AdayDetayDto = new AdayDetayDto()
  adayIdFromStorage:number=parseInt(sessionStorage.getItem("id"))
  gonderiForm:FormGroup
  topThreeTakip:TakipDetayDto[]
  isAuth=false
  finished=false
  startIndex=0
  countOfQuery=10
  ngOnInit(): void {
    this.getAllGonderiDetayDto()
    this.getAdayCvTecrubeDtoByAdayId()
    this.createGonderiForm()
    this.getAllTakipEdilenlerTopThreeByAdayId()
    this.startIndex=0
    
    
  }
  getAllGonderiDetayDto(){
    console.log("startIndex="+this.startIndex,"countOfQuery="+this.countOfQuery)
    if (!this.finished) 
    this.gonderiService.getAllAdayGonderiDetayDto(this.adayIdFromStorage,this.startIndex,this.countOfQuery).subscribe(response=>{
      
      for (let i = 0; i < response.data.length; i++) {
        this.gonderiler.push(response.data[i])  
      }     
      console.log(response.data)
      console.log(this.gonderiler)
      if(this.startIndex>=this.gonderiler.length){
        this.finished=true
      }
    })
  }
  getAdayCvTecrubeDtoByAdayId(){
    this.adayService.getAdayCvTecrubeDtoByAdayId(this.adayIdFromStorage).subscribe(response=>{
      this.aday=response.data
      console.log(this.aday)
    })
  }
  getAllYorumDetayDtoByGonderiId(gonderiId:number){
    this.yorumService.getAllYorumDetayDtoByGonderiId(gonderiId).subscribe(response=>{
      this.yorumlar=response.data
    })
  }
  createGonderiForm(){
    
    this.gonderiForm=this.formBuilder.group({
      gonderenId:[this.adayIdFromStorage,Validators.required],
      gonderiIcerik:["",Validators.required],
      gonderiImagePath:[""],
      gonderiTarih:[new Date()],
    })
  }
  trackItem (index: number, item: AdayGonderiDetayDto) {
    return item.id;
  }
  addGonderi(){
    
    if(this.gonderiForm.valid){
      let gonderiModel=Object.assign({},this.gonderiForm.value)
      console.log(gonderiModel)
      this.gonderiService.addGonderi(gonderiModel).subscribe(response=>{
        this.toastrService.success("Gönderi paylaşıldı.","Başarılı!")
        this.gonderiForm.controls['gonderiIcerik'].reset()
        this.gonderiForm.controls['gonderiTarih'].patchValue(new Date())
      })
    }
    else{
      this.toastrService.error("Gönderi içeriği giriniz.","Hata!")
    }
  }
  cikisYap(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
    this.toastrService.error("Çıkış yapıldı","Başarılı")
    this.isAuth=false
  }
  getAllTakipEdilenlerTopThreeByAdayId(){
    this.takipService.getAllTakipEdilenlerTopThreeByAdayId(this.adayIdFromStorage).subscribe(response=>{
      this.topThreeTakip=response.data
    })
  }
  onScroll(){
    this.startIndex+=10 
    this.getAllGonderiDetayDto()
  }
  gonderiSil(gonderiModel:AdayGonderiDetayDto){
    
    let gonderiSilModel= Object.assign({},gonderiModel)
    this.gonderiService.deleteGonderi(gonderiSilModel).subscribe(response=>{
      if(response.success==true){
        this.toastrService.error("Gönderi silindi","Başarılı!")
        $('#onayModal').modal('hide')
        this.gonderiler=[]
        this.startIndex-=10
        this.getAllGonderiDetayDto()       
      }
    })
  }

}

