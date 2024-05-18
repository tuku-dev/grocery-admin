import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  slno(data: [Object], page: number, perPage: number) {
    let slno = 1;
    data.forEach((x: any) => {
      x['slno'] = (page - 1) * perPage + slno;
      slno++;
    });
    return data;
  }

  date(theDate: string, format = 'YYYY-MM-DD') {
    return moment(theDate).subtract(1, 'day').format(format);
  }
}
