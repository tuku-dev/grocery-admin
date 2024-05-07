import { Injectable } from '@angular/core';

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
}
