import { Injectable } from '@angular/core';
import { LOGIN_URL } from '../routes/endpoint';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  getQuery(query: string) {
    const url = `${LOGIN_URL}/${query}`;
    return this.httpClient.get<LoginModel>(url);
  }

  postQuery(userRegister: any) {
    const url = `${LOGIN_URL}`;
    return this.httpClient.post<LoginModel>(url, userRegister);
  }

  putQuery(userUpdate: any) {
    const url = `${LOGIN_URL}`;
    return this.httpClient.put<LoginModel>(url, userUpdate);
  }

  getUsers() {
    return this.getQuery('');
  }

  getUsersById(idUser: string) {
    return this.getQuery(idUser)
      .pipe(map(user => user[0]));
  }

  getUsersByUserName(idUser: string) {
    return this.getQuery(`userName/${idUser}`)
      .pipe(map(user => user[0]));;
  }

  postUserRegister(userRegister: any) {
    return this.postQuery(userRegister);
  }

  updateUser(userUpdate: any) {
    return this.putQuery(userUpdate);
  }
}
