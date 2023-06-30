import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://restcountries.com/v3.1';

  //Este servicio retornara un observable de tipo country interface, por ende tanto la funcion como lo que retorne deben ser
  //de tipo Country
  searchCapital(term: string): Observable <Country[]> {

    const url =`${this.apiUrl}/capital/${term}`;
    
    return this.http.get<Country[]>(url);
  }

}
