import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  validateCell(phone) {
    const re = /^[0]{1}[6-8]{1}[1-8]{1}/;
    return re.test(String(phone).toLowerCase());
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
  register(email, password, lname, fname, cell) {
    return this.http.post<any>(this._Url + 'register', { email, password, lname, fname, cell });
  }

  //UPDATE USER
  update_user(email, password, lname, fname, cell) {
    var uuid = localStorage.getItem('uuid');
    return this.http.post<any>(this._Url + 'update_user', { email, password, lname, fname, uuid , cell});
  }

  //get transactions
  get_transactions() {
    var uuid = localStorage.getItem('uuid');
    return this.http.get<any>(this._Url + 'transaction/' + localStorage.getItem('uuid'))
  }

  //get balance
  get_balance() {
    var uuid = localStorage.getItem('uuid');
    return this.http.get<any>(this._Url + 'balance/' + uuid)
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

  reset_Password(email) {
    return this.http.get<any>(this._Url + 'resetPassword/'+email, {  });
  }

  update_password(password) {
    var uuid = localStorage.getItem('uuid');
    return this.http.post<any>(this._Url + 'update_password', {uuid, password });
  }

  remove_user(uuid) {
    return this.http.post<any>(this._Url + 'delete_user', { uuid });
  }

  get_all_users(searchText) {
    return this.http.post<any>(this._Url + 'get_all_users', { searchText });
  }

  register_as_admin(uuid, ur) {
    return this.http.post<any>(this._Url + 'get_all_users', { uuid, ur });
  }

  add_balance( amt) {
    var uuid = localStorage.getItem('uuid');
    return this.http.post<any>(this._Url + 'add_balance', { uuid, amt });
  }

}
