import { Pipe, PipeTransform } from '@angular/core';
import { Aday } from '../models/aday';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: Aday[], filterText: string): any[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((u:Aday)=>u.ad.toLocaleLowerCase().indexOf(filterText)!==-1
    || u.soyad.toString()==filterText
    || u.email.toLocaleLowerCase().indexOf(filterText)!==-1
    ):value;
  }

}
