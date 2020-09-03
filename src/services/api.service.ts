import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
 // _Url = "https://ems-b.herokuapp.com/"
  _Url =  "http://localhost:4000/"
  //login
  login(email, password) {
    return this.http.post<any>(this._Url + 'login', { email, password });
  }

  //Register
  register(email, password, lname, fname) {
    return this.http.post<any>(this._Url + 'register', { email, password, lname, fname });
  }

  //get transactions
  get_transactions(uuid) {
    return this.http.get<any>(this._Url + 'getTrans/' + uuid) 
  }

}
