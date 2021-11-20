import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getGeneralData() {
    let url = 'https://corona-api.com/timeline';
    return this.http.get(url);
  }

  getCountriesData() {
    let url = 'https://corona-api.com/countries?include=timeline';
    return this.http.get(url);
  }
}
