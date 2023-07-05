import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://restcountries.com/v3.1';
  searchCountrylById(code: string): Observable <Country | null> {
    const url =`${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
    .pipe(
      //map sirve para transformar la informacion
      //si countries.legth es mayor a 0, muestra el de la posicio 0, si no muestra null
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null))
    );
  }

  //Este servicio retornara un observable de tipo country interface, por ende tanto la funcion como lo que retorne deben ser
  //de tipo Country
  searchCapital(term: string): Observable <Country[]> {
    const url =`${this.apiUrl}/capital/${term}`;
// Pipe es un transformador, el catchError toma el error y con un of que es un observador of(variable) lo retorna en un arreglo vacio
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([]))
    );
  }

  searchCountry(term: string): Observable <Country[]> {
    const url =`${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([]))
    );
  }

  searchRegion(term: string): Observable <Country[]> {
    const url =`${this.apiUrl}/region/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([]))
    );
  }



}
