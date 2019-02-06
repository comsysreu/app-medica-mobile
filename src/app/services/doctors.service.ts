import { Injectable } from '@angular/core';
import { DOCTORS_URL } from '../routes/endpoint';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DoctorModel } from '../models/doctos.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private httpClient: HttpClient) { }

  getQuery(query: string) {
    const url = `${DOCTORS_URL}/${query}`;
    return this.httpClient.get<DoctorModel>(url);
  }

  postQuery(user: string) {
    const url = `${DOCTORS_URL}`;
    return this.httpClient.post<any>(url, user);
  }

  updateQuery(user: string) {
    const url = `${DOCTORS_URL}`;
    return this.httpClient.put<any>(url, user);
  }
  
  getDoctors() {
    return this.getQuery('');
  }

  getDoctorId(doctorId: string){
    return this.getQuery(`user/${doctorId}`);
  }

  postDoctor(user: any){
    return this.postQuery(user);
  }

  updateDoctor(user: any){
    return this.updateQuery(user);
  }

}
