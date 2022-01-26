import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, CountryData, Data } from '../models';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getGeneralData(): Observable<APIResponse<Data>> {
    let url = 'https://corona-api.com/timeline';
    return this.http.get<APIResponse<Data>>(url);
  }

  getCountriesData() {
    let url = 'https://corona-api.com/countries?include=timeline';
    return this.http.get<APIResponse<CountryData>>(url);
  }
}
