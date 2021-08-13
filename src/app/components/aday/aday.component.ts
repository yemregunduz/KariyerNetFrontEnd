import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Aday } from 'src/app/models/aday';
import { AdayDetayDto } from 'src/app/models/adayDetayDto';
import { AdayOkulBolumDto } from 'src/app/models/adayOkulBolumDto';
import { AdayTecrubeDetayDto } from 'src/app/models/adayTecrubeDetayDto';
import { Pozisyon } from 'src/app/models/pozisyon';
import { Sirket } from 'src/app/models/sirket';
import { AdayOkulBolumService } from 'src/app/services/aday-okul-bolum.service';
import { AdayTecrubeService } from 'src/app/services/aday-tecrube.service';
import { AdayService } from 'src/app/services/aday.service';
import { IsverenService } from 'src/app/services/isveren.service';
import { PozisyonService } from 'src/app/services/pozisyon.service';
import { SirketService } from 'src/app/services/sirket.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { trLocale } from 'ngx-bootstrap/locale';
import { AdayTecrube } from 'src/app/models/adayTecrube';
import { TakipService } from 'src/app/services/takip.service';
import { TakipDetayDto } from 'src/app/models/takipDetayDto';
import { debounceTime } from 'rxjs/operators'

import { TakipClassModel } from 'src/app/models/takipClassModel';
import { OkulBolumService } from 'src/app/services/okul-bolum.service';
import { OkulBolum } from 'src/app/models/okulBolum';
import { Bolum } from 'src/app/models/bolum';
import { Okul } from 'src/app/models/okul';
import { OkulService } from 'src/app/services/okul.service';
import { BolumService } from 'src/app/services/bolum.service';
import { OkulDetayDto } from 'src/app/models/okulDetayDto';

import { DateTimeFormatPipe } from 'src/app/pipes/date-time-format.pipe';
import { AdayYetenekDetaydto } from 'src/app/models/adayYetenekDetayDto';
import { AdayYetenekService } from 'src/app/services/aday-yetenek.service';
import { YetenekTip } from 'src/app/models/yetenekTip';
import { YetenekTipService } from 'src/app/services/yetenek-tip.service';
import { YetenekService } from 'src/app/services/yetenek.service';
import { YetenekDetayDto } from 'src/app/models/yetenekDetayDto';


defineLocale('tr', trLocale);

declare var $:any
@Component({
  selector: 'app-aday',
  templateUrl: './aday.component.html',
  styleUrls: ['./aday.component.css']
})
export class AdayComponent implements OnInit {
 
  adayInfEditForm:FormGroup
  adaySosyalMedyaInfEditForm:FormGroup
  addAdayIsTecrubeForm:FormGroup
  adaylar:Aday[]
  sirketler:Sirket[]
  pozisyonlar:Pozisyon[]
  adayOkulBolumler:AdayOkulBolumDto[]
  dataLoaded=false
  aday:AdayDetayDto = new AdayDetayDto()
  adayTecrubeleri:AdayTecrubeDetayDto[]
  adayYas:number
  adayIdFromStorage:number=parseInt(sessionStorage.getItem("id"))
  girisTarih=new Date()
  cikisTarih=new Date()
  okulGirisTarih=new Date()
  okulCikisTarih=new Date()
  bsConfig: Partial<BsDatepickerConfig>;
  locale:'tr';
  selectedSirket:number
  selectedPozisyon:number
  selectedOkul:number
  uploadImageForm:FormGroup
  takipEdilenler:TakipDetayDto[]=[]
  takipciler:TakipDetayDto[]=[]
  takipEkleForm:FormGroup
  takipEdilebilirMi=false
  takip:TakipClassModel
  okulEkleForm:FormGroup
  okulBolumler:OkulDetayDto[]
  okullar:Okul[]
  isAuth=false;
  okulTipleri:['Lisans','Yüksek Lisans','Lise']
  adayYetenekleri:AdayYetenekDetaydto[];
  yetenekTipleri:YetenekTip[]
  filterText:string=""
  yetenekler:YetenekDetayDto[]
  yetenekSearchForm:FormGroup
  newYetenekArray:YetenekDetayDto[]=[]
  addYetenekToAdayForm:FormGroup
  eklenebilirMi=true
  

  
  
  constructor(private adayService:AdayService,private activatedRoute:ActivatedRoute,
    private adayTecrubeService:AdayTecrubeService,private toastrService:ToastrService,private formBuilder:FormBuilder,private adayOkulBolumService:AdayOkulBolumService,
    private sirketService:SirketService,private pozisyonService:PozisyonService,private localeService:BsLocaleService,private takipService:TakipService,private router:Router,
    private okulBolumService:OkulBolumService,private okulService:OkulService,private adayYetenekService:AdayYetenekService,private yetenekTipService:YetenekTipService,
    private yetenekService:YetenekService) { 
      this.localeService.use(this.locale);
      
    }
  ngOnInit(): void {
    
    
    
    this.activatedRoute.params.subscribe(params=>{
      if(["adayId"])
      {
        
        this.createTakipEkleForm()
        this.createAdayInfEditForm()
        this.createAdaySosyalMedyaInfEditForm()
        this.createAdayIsTecrubeEkleForm()
        this.getAllAdaylar();
        this.isAuthenticated()
        this.createOkulEkleForm()
        this.getAllTakipcilerByAdayId()
        this.getAllTakipEdilenlerByAdayId()
        this.getAdayCvTecrubeDtoByAdayId();
        this.getAllAdayTecrubeDetayDtoByAdayId()
        this.getAllAdayOkulBolumDtoByAdayId()
        this.getAllTakipEdilenlerByAdayId()
        this.getAllTakipcilerByAdayId()
        this.getAllOkullar()
        this.getAllYetenekTip()
        this.getAllAdayYetenekDetayDtoByAdayId()
        this.createYetenekSearchForm()
        this.createAddYetenekToAdayForm()
        
        
        
        if(this.isAuth==true){
          this.getTakipByTakipciAndtakipEdilenId()
          this.checkIfUserAlreadyFollow()
        }
      }
      else{
        this.getAllAdaylar();
      }
    })
    
    
  }
  isAuthenticated(){
    if(sessionStorage.getItem("token")){
      this.isAuth=true
    }
    else{
      this.isAuth=false
    }
  }
  getAllAdaylar(){
    this.adayService.getAllAday().subscribe(response=>{
      this.adaylar=response.data
      this.dataLoaded=true
      
    })
  }
  getAllSirketler(){
    this.sirketService.getAll().subscribe(response=>{
      this.sirketler=response.data 
    })
  }
  getAllPozisyonlar(){
    this.pozisyonService.getAll().subscribe(response=>{
      this.pozisyonlar=response.data
    })
  }
  getAdayCvTecrubeDtoByAdayId()
  {
    this.activatedRoute.params.subscribe(params=>{
      this.adayService.getAdayCvTecrubeDtoByAdayId(params["adayId"]).subscribe(response=>{
        this.aday=response.data
        this.createTakipEkleForm()
        this.createAdayInfEditForm()
        this.createAdaySosyalMedyaInfEditForm()
        this.createAdayIsTecrubeEkleForm()
        this.createOkulEkleForm()
      })
    })
    
  }
  getAllAdayTecrubeDetayDtoByAdayId(){
    this.activatedRoute.params.subscribe(params=>{
      this.adayTecrubeService.GetAllAdayTecrubeDetayDtoByAdayId(params["adayId"]).subscribe(response=>{
        this.adayTecrubeleri=response.data
        
      })
    })
    
  }
  createAdayInfEditForm(){
    
    this.adayInfEditForm=this.formBuilder.group({
      id:[this.aday.adayId,Validators.required],
      ad:[this.aday.ad,Validators.required],
      soyad:[this.aday.soyad,Validators.required],
      email:[this.aday.email,Validators.required],
      adayTelNo:[this.aday.adayTelNo],
      adayAdres:[this.aday.adayAdres],
      dogumYili:[this.aday.dogumYili]
    })
    this.adayYas=new Date().getFullYear()-parseInt(this.aday.dogumYili)
  }
  adayInfEdit(){
    if(this.adayInfEditForm.valid){
      let aday=Object.assign({},this.adayInfEditForm.value)
      this.adayService.updateAdayIletisimBilgileri(aday).subscribe(response=>{
        this.toastrService.success("İletişim bilgileriniz güncellendi.","Başarılı!")
        this.getAdayCvTecrubeDtoByAdayId();
        $('#editInfModal').modal('hide')
        this.adayInfEditForm.reset()
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Ad-Soyad ve email alanlarını doldurmak zorunludur!","Hata!")
      
    }
  }
  createAdaySosyalMedyaInfEditForm(){
    this.adaySosyalMedyaInfEditForm=this.formBuilder.group({
      id:[this.aday.adayId,Validators.required],
      adayLinkedin:[this.aday.adayLinkedin],
      adayGithub:[this.aday.adayGithub],
      adayTwitter:[this.aday.adayTwitter],
      adayInstagram:[this.aday.adayInstagram],
      adayFacebook:[this.aday.adayFacebook]
    })
    
  }
  adaySosyalMedyaInfEdit(){
    if(this.adaySosyalMedyaInfEditForm.valid){
      let aday = Object.assign({},this.adaySosyalMedyaInfEditForm.value)
      this.adayService.updateAdaySosyalMedyaBilgileri(aday).subscribe(response=>{
        this.toastrService.success("Sosyal medya bilgileriniz güncellendi.","Başarılı!")
        this.getAdayCvTecrubeDtoByAdayId();
        $('#editSosyalMedyaInfModal').modal('hide')
        this.adaySosyalMedyaInfEditForm.reset()
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Hata!")
    }
  }
  createAdayIsTecrubeEkleForm()
  {
    this.addAdayIsTecrubeForm=this.formBuilder.group({
      adayId:[this.aday.adayId,Validators.required],
      sirketId:["",Validators.required],
      pozisyonId:["",Validators.required],
      girisTarih:["",Validators.required],
      cikisTarih:[""]
    })
    
  }
  addAdayIsTecrube(){
    
    var sirketId=parseInt(this.addAdayIsTecrubeForm.controls['sirketId'].value)
    var adayId= this.addAdayIsTecrubeForm.controls['adayId'].value
    var girisTarih=JSON.stringify(this.addAdayIsTecrubeForm.controls['girisTarih'].value).substr(1,24)
    var cikisTarih=JSON.stringify(this.addAdayIsTecrubeForm.controls['cikisTarih'].value).substr(1,24)
    var pozisyonId=parseInt(this.addAdayIsTecrubeForm.controls['pozisyonId'].value)
    const target= {sirketId,adayId,girisTarih,cikisTarih,pozisyonId}
    if(this.addAdayIsTecrubeForm.valid){
      let adayIsTecrube = Object.assign({},target)
      
      this.adayTecrubeService.addAdayTecrube(adayIsTecrube).subscribe(response=>{
        
          this.toastrService.success("İş tecrübesi eklendi.","Başarılı!")
          this.getAllAdayTecrubeDetayDtoByAdayId()
          $('#isTecrubeEkleModal').modal('hide')
          this.addAdayIsTecrubeForm.reset()
          this.addAdayIsTecrubeForm.patchValue({
            adayId: this.adayIdFromStorage
          })
          
        
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz!","Hata!")
    }
    
  }
  deleteAdayIsTecrube(adayTecrube:AdayTecrubeDetayDto){
    let adayTecrubeModel = Object.assign({},adayTecrube)
    this.adayTecrubeService.deleteAdayTecrube(adayTecrubeModel).subscribe(response=>{
      
      this.getAllAdayTecrubeDetayDtoByAdayId()
      $('#onayModal').modal('hide')
    })
  }
  getAllAdayOkulBolumDtoByAdayId()
  {
    this.activatedRoute.params.subscribe(params=>{
      this.adayOkulBolumService.getAllOkulAdayBolumDtoByAdayId(params["adayId"]).subscribe(response=>{
        this.adayOkulBolumler=response.data
        
      })
    })
  }
  getAllTakipEdilenlerByAdayId(){
    this.activatedRoute.params.subscribe(params=>{
      this.takipService.GetAllTakipEdilenlerByAdayId(params["adayId"]).subscribe(response=>{
        this.takipEdilenler=response.data
        
      })
    })
  }
  getAllTakipcilerByAdayId(){
    this.activatedRoute.params.subscribe(params=>{
      this.takipService.GetAllTakipcilerByAdayId(params["adayId"]).subscribe(response=>{
        this.takipciler=response.data
        
      })
    })
  }
  createTakipEkleForm(){
    this.takipEkleForm=this.formBuilder.group({
      takipEdilenId:[this.aday.adayId,Validators.required],
      takipciId:[this.adayIdFromStorage,Validators.required]
    })
  }
  takipEt(){
    let takipModel= Object.assign({},this.takipEkleForm.value)
    this.takipService.AddTakip(takipModel).subscribe(response=>{
      window.location.reload()
    })
  }
  takiptenCik(){
    this.takipService.DeleteTakip(this.takip).subscribe(response=>{
      $('#onayModal').modal('hide')
      this.checkIfUserAlreadyFollow()
      window.location.reload()
      
    })
  }
  checkIfUserAlreadyFollow(){
    this.activatedRoute.params.subscribe(params=>{
      this.takipService.checkIfUserAlreadyFollow(this.adayIdFromStorage,params["adayId"]).subscribe(response=>{
        this.takipEdilebilirMi=response.success
      })
    })
  }
  getTakipByTakipciAndtakipEdilenId(){
    this.activatedRoute.params.subscribe(params=>{
      this.takipService.getTakipByTakipciAndTakipEdilenId(this.adayIdFromStorage,params["adayId"]).subscribe(response=>{
        this.takip=response
        
      })
    })
  }
  clickButton() {
    $('#takipEdilenlerModal').modal('hide')
    $('#takipciModal').modal('hide')
  }
  createOkulEkleForm(){
    this.okulEkleForm=this.formBuilder.group({
      adayId:[this.aday.adayId,Validators.required],
      okulBolumId:["",Validators.required],
      okulGirisTarih:["",Validators.required],
      okulCikisTarih:["",Validators.required],
      okulId:["",Validators.required],
      okulTip:["",Validators.required]
    })
  }
  addOkulBolum(){
      var adayId= this.okulEkleForm.controls['adayId'].value
      var okulBolumId=parseInt(this.okulEkleForm.controls['okulBolumId'].value)
      var okulGirisTarih=JSON.stringify(this.okulEkleForm.controls['okulGirisTarih'].value).substr(1,24)
      var okulCikisTarih=JSON.stringify(this.okulEkleForm.controls['okulCikisTarih'].value).substr(1,24)
      var okulTip=this.okulEkleForm.controls['okulTip'].value
      const target= {adayId,okulBolumId,okulGirisTarih,okulCikisTarih,okulTip}

    if(this.okulEkleForm.valid){
      console.log(target)
      let okulBolumModel = Object.assign({},target)
      this.adayOkulBolumService.addOkulAday(okulBolumModel).subscribe(response=>{
        this.toastrService.success("Okul eklendi","Başarılı!")
        this.getAllAdayOkulBolumDtoByAdayId()
        $('#okulEkleModal').modal('hide')
        this.okulEkleForm.reset()
        this.okulBolumler=[]
          this.okulEkleForm.patchValue({
            adayId: this.adayIdFromStorage,
            okulId: "0",
            okulBolumId:"0",
            okulTip:"0"
            
          })
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz","Hata!")
    }
    
  }
  getAllOkullar(){
    this.okulService.getAllOkullar().subscribe(response=>{
      this.okullar=response.data
    })
  }
  getAllOkulBolumByOkulId(){
    console.log(this.selectedOkul)
    this.okulBolumService.GetAllOkulBolumByOkulId(this.selectedOkul).subscribe(response=>{
      this.okulBolumler=response.data
      
    })
  }
  getAllAdayYetenekDetayDtoByAdayId(){
    this.activatedRoute.params.subscribe(params=> 
      this.adayYetenekService.getAllAdayYetenekDetayDtoByAdayId(params["adayId"]).subscribe(response=>{
        this.adayYetenekleri=response.data        
      }))
  }
  getAllAdayYetenekDetayDtoByAdayIdAndYetenekTipId(yetenekTipId:number){
    this.activatedRoute.params.subscribe(params=>{
      this.adayYetenekService.getAllAdayYetenekDetayDtoByAdayIdAndYetenekTipId(params["adayId"],yetenekTipId).subscribe(response=>{      
      })
    })
  }
  getAllYetenekTip(){
    this.yetenekTipService.getAll().subscribe(response=>{
      this.yetenekTipleri=response.data;
    })
  }
  getAllYetenekDetayDtoBySearchFilter(){
    this.yetenekService.getAllYetenekDetayDtoBySearchFilter(this.filterText).subscribe(response=>{
      this.yetenekler=response.data
    })
  }
  createYetenekSearchForm(){
    this.yetenekSearchForm=this.formBuilder.group({
      formFilterText:[this.filterText]
    })
    this.yetenekSearchForm.get('formFilterText').valueChanges
              .pipe(debounceTime(750))
              .subscribe(response=>{
                this.getAllYetenekDetayDtoBySearchFilter()
              })
  }

  close(){
    this.addAdayIsTecrubeForm.reset()
    this.okulEkleForm.reset()
  }
  addYetenekToNewYetenekArray(yetenekDetayDto:YetenekDetayDto){
    this.activatedRoute.params.subscribe(params=>{
      this.adayYetenekService.yetenekAlreadyExist(params["adayId"],yetenekDetayDto.yetenekId).subscribe(response=>{
        if(response.success==true){
          if(this.newYetenekArray.length>0){
            console.log(this.newYetenekArray.indexOf(yetenekDetayDto))
            if(this.newYetenekArray.map(function(e){return e.yetenekId}).indexOf(yetenekDetayDto.yetenekId)===-1)
            {
              this.newYetenekArray.push(yetenekDetayDto)
            }
            else{
              this.toastrService.error("Bu yeteneği zaten eklediniz","Hata!")
            }
          }
          else{
            this.newYetenekArray.push(yetenekDetayDto)
            console.log(this.newYetenekArray) 
          }
            
        }
        else{
          this.toastrService.error("Bu yeteneğe zaten sahipsin!","Hata!")
        }
      })
    })
    
  }
  deleteFromNewYetenekArray(yetenekDetayDto:YetenekDetayDto){
    let index=this.newYetenekArray.indexOf(yetenekDetayDto)
    
    this.newYetenekArray.splice(index,1)
    console.log(this.newYetenekArray)
  }
  createAddYetenekToAdayForm(){
    this.addYetenekToAdayForm=this.formBuilder.group({
      adayId:[""],
      yetenekId:[""]
    })
  }
  addYetenekToAday(){
    if(this.newYetenekArray.length>0){
      for (let i = 0; i < this.newYetenekArray.length; i++) {
        let yetenekId = this.newYetenekArray[i].yetenekId;
        let adayId = this.adayIdFromStorage
        const target = {adayId,yetenekId}
        let adayYetenek = Object.assign({},target)
        this.adayYetenekService.addAdayYetenek(adayYetenek).subscribe(response=>
          {
            this.toastrService.success("Yetenekler eklendi","Başarılı")
            $("#yetenekEkleModal").modal('hide')
            this.getAllAdayYetenekDetayDtoByAdayId()
            this.newYetenekArray=[]
          })
     }
    }   
  }
  deleteYetenekFromAday(id:number){
    const target = {id}
    let adayYetenek= Object.assign({},target)
    console.log(adayYetenek)
    this.adayYetenekService.deleteAdayYetenek(adayYetenek).subscribe(response=>{
      this.toastrService.error("Yetenek silindi","Başarılı!")
      this.getAllAdayYetenekDetayDtoByAdayId()
    })
    
  }

  

}
