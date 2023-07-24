import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
import { APIInterceptor } from 'src/app/shared/htpp.injectable';
import { InterceptorApi } from 'src/app/shared/interfaces/interceptorApi';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private apiReq: APIInterceptor,
    private http: HttpClient,
    ) {

  }



  // interceptorApi(term: string): Observable <Country[]>{
  //   return this.apiReq<Country[]>

  // }


}
