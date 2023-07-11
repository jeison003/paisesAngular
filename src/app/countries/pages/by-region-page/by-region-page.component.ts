import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';
import { Region } from '../../interfaces/region.type';


//LA variable tipo Type, es como la interface, pero no es escalable
//Region solo tiene permitido identificar esas 5 palabras


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit,OnDestroy {

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
   this.region = this.countriesService.cacheStore.byRegion.countries;
   this.regionSelected = this.countriesService.cacheStore.byRegion.region;
  }

  public region: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public regionSelected?: Region;
  private requestSuscription?: Subscription;

  ngOnDestroy(): void {
    this.requestSuscription?.unsubscribe();
  }

  searchByRegion(term: Region):void{
    this.regionSelected = term;
    this.isLoading = true;
    this.requestSuscription = this.countriesService.searchRegion(term)
    .subscribe(region =>{
      this.region = region;
      this.isLoading = false;
    } )

  }

}
