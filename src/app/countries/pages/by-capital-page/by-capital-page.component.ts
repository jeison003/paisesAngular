import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  constructor(private countryService: CountriesService){}

  public countries: Country[] = [];

  @Output()
  public placeholder: string = 'Buscar por capital'
  

  searchByCapital(term: string):void {
   this.countryService.searchCapital(term)
   .subscribe(countries => {
    this.countries = countries;
   })
  }
}
