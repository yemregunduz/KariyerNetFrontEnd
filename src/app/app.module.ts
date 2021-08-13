import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {JwPaginationModule} from 'jw-angular-pagination'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {DatepickerModule} from 'ng2-datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete'
import {MatTooltipModule} from '@angular/material/tooltip';
import {A11yModule} from '@angular/cdk/a11y';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatBadgeModule} from '@angular/material/badge';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { AdayComponent } from './components/aday/aday.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AdayTecrubeComponent } from './components/aday-tecrube/aday-tecrube.component';
import { BolumComponent } from './components/bolum/bolum.component';
import { CvComponent } from './components/cv/cv.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { IsverenComponent } from './components/isveren/isveren.component';
import { OkulComponent } from './components/okul/okul.component';
import { PozisyonComponent } from './components/pozisyon/pozisyon.component';
import { ProgramlamaComponent } from './components/programlama/programlama.component';
import { SehirComponent } from './components/sehir/sehir.component';
import { SirketComponent } from './components/sirket/sirket.component';
import { SistemPersonelComponent } from './components/sistem-personel/sistem-personel.component';
import { TeknolojiComponent } from './components/teknoloji/teknoloji.component';
import { YabanciDilComponent } from './components/yabanci-dil/yabanci-dil.component';
import { SiralamaPipe } from './pipes/siralama.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AnaSayfaComponent } from './components/ana-sayfa/ana-sayfa.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UyeliksizAnaSayfaComponent } from './components/uyeliksiz-ana-sayfa/uyeliksiz-ana-sayfa.component';




@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    AdayComponent,
    AdayTecrubeComponent,
    BolumComponent,
    CvComponent,
    IlanComponent,
    IsverenComponent,
    OkulComponent,
    PozisyonComponent,
    ProgramlamaComponent,
    SehirComponent,
    SirketComponent,
    SistemPersonelComponent,
    TeknolojiComponent,
    YabanciDilComponent,
    SiralamaPipe,
    DateTimeFormatPipe,
    FilterPipe,
    AnaSayfaComponent,
    LoginRegisterComponent,
    SafeHtmlPipe,
    UyeliksizAnaSayfaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    JwPaginationModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatepickerModule,
    BsDatepickerModule.forRoot(),
    MatAutocompleteModule,
    AutocompleteLibModule,
    MatTooltipModule,
    A11yModule,
    MatExpansionModule,
    MatTabsModule,
    MatSliderModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatRippleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    CdkAccordionModule,
    CdkTreeModule,
    MatTreeModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
