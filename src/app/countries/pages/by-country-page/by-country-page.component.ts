import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit,OnDestroy{

  constructor(private countryService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.searchPast = this.countryService.cacheStore.byCountries.term;
  }

  ngOnDestroy(): void {
    this.requestSuscription?.unsubscribe();
  }

  public countries: Country[] = [];
  public isLoading: boolean = false;
  private requestSuscription?: Subscription;
  public searchPast: string = '';

  searchByCountry(term: string):void{
    this.isLoading = true;
    this.requestSuscription = this.countryService.searchCountry(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    })


  }
}
