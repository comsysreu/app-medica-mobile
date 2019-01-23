import { Injectable } from '@angular/core';
import { LOGIN_URL } from '../routes/endpoint';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';

import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getUser(){
    getJSON(LOGIN_URL).then((response: any) => {
      console.log(response);
      return response;
    }, (error) => {
      console.log(error);
      return error
    });
  }

}
