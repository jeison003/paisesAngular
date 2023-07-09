import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit,OnDestroy{

  constructor(private countryService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term
  }


  public countries: Country[] = [];
  public isLoading: boolean = false;
// El initial value capturara el valor de busqueda que se realizo al comienzo, si no estara vacio, y se mostrara
//gracias a [value] que es una propiedad del input, esta estara en el componente searchBox
  public initialValue: string = '';
  private requestSuscription?: Subscription;

    // @Output()
    // public placeholder: string = 'Buscar por capital'

  ngOnDestroy(): void {
    this.requestSuscription?.unsubscribe();
  }

  searchByCapital(term: string):void {

   this.isLoading = true;
   this.requestSuscription = this.countryService.searchCapital(term)
   .subscribe(countries => {
    this.countries = countries;
    this.isLoading = false;
   })
  }
}
