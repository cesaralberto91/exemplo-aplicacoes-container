import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = "http://localhost:3333";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.urlBase}/users`).toPromise();
  }

  delete(id: number) {
    return this.http.delete(`${this.urlBase}/users/${id}`).toPromise();
  }

  create(user: any) {
    return this.http.post(`${this.urlBase}/users`, user).toPromise();
  }
}
