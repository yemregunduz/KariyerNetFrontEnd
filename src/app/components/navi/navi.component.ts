import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aday } from 'src/app/models/aday';
import { AdayService } from 'src/app/services/aday.service';
import { AuthService } from 'src/app/services/auth.service';
import { debounceTime } from 'rxjs/operators'
import { Router } from '@angular/router';



declare var $:any


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  loginForm:FormGroup;
  adayKayitForm:FormGroup;
  isAuth=false;
  adaylar:Aday[]
  filterText=""
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private adayService:AdayService,private router:Router) { }
  adayId:number
  focusFirst=true
  searchForm:FormGroup
  ngOnInit(): void {

    this.setAdayId()
    this.createLoginForm()
    this.createAdayKayitForm()
    this.isAuthenticated()
    this.createSearchForm()  
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      sifre:["",Validators.required],
    })
  }
  createAdayKayitForm(){
    this.adayKayitForm=this.formBuilder.group({
      email:["",Validators.required],
      sifre:["",Validators.required],
      ad:["",Validators.required],
      soyad:["",Validators.required],
      tcNo:["",Validators.required],
      dogumYili:["",Validators.required]
    })
  }
  adayGiris(){
    if(this.loginForm.valid){

      let adayGirisDto=Object.assign({},this.loginForm.value)
      this.authService.adayGiris(adayGirisDto).subscribe(response=>{

        sessionStorage.setItem("token",response.data.token)
        sessionStorage.setItem("id",response.data.id.toString())
        this.toastrService.success("Giriş yapıldı.","Başarılı!")
        $('#loginModal').modal('hide')
        this.isAuthenticated()
        this.loginForm.reset()
        this.setAdayId()
        window.location.reload()
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Formu doldurunuz!","Hata!")
    }  
  }
  adayKayit(){
    if(this.adayKayitForm.valid) {
    let adayKayitDto=Object.assign({},this.adayKayitForm.value)
    this.authService.adayKayit(adayKayitDto).subscribe(response=>{

      sessionStorage.setItem("token",response.data.token)
      sessionStorage.setItem("id",response.data.id.toString())
      this.toastrService.success("Kayıt olundu","Otomatik giriş yapılıyor")
      $('#adayKayitModal').modal('hide')
      this.isAuthenticated()
      this.adayKayitForm.reset()
    },responseError=>{
      this.toastrService.error(responseError.error)
    })
    }
    else{
      this.toastrService.error("Tüm bilgileri eksiksiz giriniz!","Hata!")
    }
  }
  closeModal()
  {
    this.loginForm.reset();
  }
  cikisYap(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
    this.toastrService.error("Çıkış yapıldı","Başarılı")
    this.isAuthenticated
    window.location.reload()
  }
  isAuthenticated(){
    if(sessionStorage.getItem("token")){
      this.isAuth=true
    }
    else{
      this.isAuth=false
    }
  }
  setAdayId()
  {
    this.adayId=parseInt(sessionStorage.getItem("id"))
  }
  getAllAdaylarByFilterText(){
    this.adayService.getAllAdaylarByFilterText(this.filterText).subscribe(response=>{
      this.adaylar=response.data
    })
  }
  createSearchForm(){
    this.searchForm=this.formBuilder.group({
      filterTextForm:[this.filterText]
    })
    this.searchForm.get('filterTextForm').valueChanges
          .pipe(debounceTime(750))
          .subscribe(response=>{
            this.getAllAdaylarByFilterText()
          })
  }
  scrollTop(){
    window.scrollTo(0, 0);
  }
 
  

}
