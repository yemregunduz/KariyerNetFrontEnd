import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdayComponent } from './components/aday/aday.component';
import { AnaSayfaComponent } from './components/ana-sayfa/ana-sayfa.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

import { PozisyonComponent } from './components/pozisyon/pozisyon.component';
import { UyeliksizAnaSayfaComponent } from './components/uyeliksiz-ana-sayfa/uyeliksiz-ana-sayfa.component';
import { LoginGuard } from './guards/login.guard';



const routes: Routes = [

  {path:"ilanlar/pozisyonlar/:pozisyonId",component:IlanComponent},
  {path:"ilanlar",component:IlanComponent},
  {path:"",component:AnaSayfaComponent,canActivate:[LoginGuard]},
  {path:"adayprofil/:adayId",component:AdayComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginRegisterComponent},
  {path:"nonlogin",component:UyeliksizAnaSayfaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
