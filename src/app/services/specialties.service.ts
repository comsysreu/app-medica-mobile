import { Injectable } from '@angular/core';
import { SPECIALTIES_URL } from '../routes/endpoint';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(private httpClient: HttpClient) { }

  getQuery(query: string) {
    const url = `${SPECIALTIES_URL}/${query}`;
    return this.httpClient.get<any>(url);
  }

  getSpecialties() {
    return this.getQuery('');
  }

}
