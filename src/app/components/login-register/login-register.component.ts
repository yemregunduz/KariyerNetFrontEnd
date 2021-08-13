import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  adayGirisForm:FormGroup
  adayKayitForm:FormGroup
  isAuth=false
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAdayGirisForm()
    this.createAdayKayitForm()
    this.loginSayfasinaDonerseCikisYap()
  }
  createAdayGirisForm(){
    this.adayGirisForm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      sifre:["",Validators.required],
    })
  }
  adayGirisYap(){
    if(this.adayGirisForm.valid){
      let adayGirisDetayDto = Object.assign({},this.adayGirisForm.value)
      this.authService.adayGiris(adayGirisDetayDto).subscribe(response=>{
        sessionStorage.setItem("token",response.data.token)
        sessionStorage.setItem("id",response.data.id.toString())
        this.toastrService.success("Giriş yapıldı.","Başarılı!")
        this.isAuthenticated()
        this.adayGirisForm.reset()
        this.router.navigate([""])
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
  createAdayKayitForm(){
    this.adayKayitForm = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      ad:["",Validators.required],
      soyad:["",Validators.required],
      tcNo:["",[Validators.required,Validators.minLength(11)]],
      dogumYili:["",Validators.required],
      sifre:["",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@!%*?+#&'()[=\"€])[A-Za-z\\d$@!%*?+#&'()[=\"€']{8,}")]]
    })
  }
  adayKayitOl(){
    if(this.adayKayitForm.valid){
      let adayKayitDetayDto = Object.assign({},this.adayKayitForm.value)
      console.log(adayKayitDetayDto)
      this.authService.adayKayit(adayKayitDetayDto).subscribe(response=>{
        sessionStorage.setItem("token",response.data.token)
        sessionStorage.setItem("id",response.data.id.toString())
        this.toastrService.success("Otomatik olarak giriş yapıldı","Kayıt Başarılı!")
        this.router.navigate([""]).then(()=>{window.location.reload})
        this.isAuthenticated()
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Hata!")
    }
  }
  isAuthenticated(){
    if(sessionStorage.getItem("token")){
      this.isAuth=true
    }
    else{
      this.isAuth=false
    }
  }
  loginSayfasinaDonerseCikisYap(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("token")
    
  }
}
