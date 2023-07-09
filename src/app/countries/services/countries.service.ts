import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }

  //guardamos la busqueda en el local storage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    //si no tiene nada retorna(no tendria nada si fuese la primera vez que abre la app o borro todas las busquedas)
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  //funcion para centralizar las peticiones de la API country
  private getCountriesRequest(url: string): Observable <Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([])),
      //el delay lo que hace es que pone en espera 2 segundo la peticion y luego la muestra
      // delay(2000)
    );
  }

  //servicio que busca el pais por el id del url
  searchCountrylById(code: string): Observable <Country | null> {
    const url =`${this.apiUrl}/alpha/${code}`;
// Pipe es un transformador, el catchError toma el error y con un of que es un observador of(variable) lo retorna en un arreglo vacio
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
    return this.getCountriesRequest(url)
    .pipe(
      //El tap no va a influir en el funcionamiento de la peticion, lo usamos en este caso para guardar la informacion
      //ademas que el tap tiene toda la informacion de la peticion, por lo tanto tiene los paises
      //en el cacheStore.byCapital, guarda el termino de busqueda y los pasies encontrados (lo guarda como si fuesen un objeto)
      tap(countries => this.cacheStore.byCapital = {term: term, countries: countries}),
      tap(() => this.saveToLocalStorage()),
      //usamos aqui para guardar en el local storage cada cambio que se le haga a la peticion
    );
  }

  searchCountry(term: string): Observable <Country[]> {
    const url =`${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term: term, countries: countries}),
      tap(() => this.saveToLocalStorage()),
    )
  }

  searchRegion(term: Region): Observable <Country[]> {
    const url =`${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region: term, countries: countries}),
      tap(() => this.saveToLocalStorage()),
    )
  }



}
