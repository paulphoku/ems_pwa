import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  _Url = "https://ems-b.herokuapp.com/"
  //_Url = "http://localhost:8080/"

  //login
  login(email, password) {
    return this.http.post<any>(this._Url + 'login', { email, password });
  }

  //Register
  register(email, password, lname, fname) {
    return this.http.post<any>(this._Url + 'register', { email, password, lname, fname });
  }

  //UPDATE USER
  update_user(email, password, lname, fname) {
    var uuid = localStorage.getItem('uuid');
    return this.http.post<any>(this._Url + 'update_user', { email, password, lname, fname, uuid });
  }

  //get transactions
  get_transactions() {
    var uuid = localStorage.getItem('uuid');
    return this.http.get<any>(this._Url + 'transaction/' + localStorage.getItem('uuid'))
  }

  //get balance
  get_balance() {
    return this.http.get<any>(this._Url + 'balance/' + localStorage.getItem('uuid'))
  }

  //get user
  get_user() {
    return this.http.get<any>(this._Url + 'getUser/' + localStorage.getItem('uuid'))
  }

  send_update(title, message, link, priority) {
    return this.http.post<any>(this._Url + 'send_updates', { title, message, link, priority });
  }

  get_all_reports(searchText) {
    return this.http.post<any>(this._Url + 'get_all_reports', { searchText });
  }

  get_all_updates(searchText) {
    return this.http.post<any>(this._Url + 'get_all_updates', { searchText });
  }

  add_report(train,type,title,message) {
    return this.http.post<any>(this._Url + 'add_report', { train, type, title, message });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
