import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siralama'
})
export class SiralamaPipe implements PipeTransform {

  transform(array: any, field: string): any[] {
    
    array.sort((a: any, b: any) => {
      
      if (a[field].localeCompare(b[field]) < b[field].localeCompare(a[field])) {
        return -1;
      } else if (a[field].localeCompare(b[field]) > b[field].localeCompare(a[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
