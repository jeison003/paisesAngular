import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{


   public country?: Country
//el ActivatedRoute se usa para sacar argumentos del URL
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountriesService
    ){}
//Los params son observable, con el OnInit sacamos enseguida el ID del pais que queremos buscar
  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      //switchMap recibe el valor anterior y regresa un nuevo Observable y lo recibe el subcribe de abajo
      switchMap(({id})=> this.countryService.searchCountrylById(id)),
    )
    .subscribe((country) => {
      if(!country) return this.router.navigateByUrl('');

      return this.country = country;
      //

    })
  }


  // ngOnInit(): void {
  //   this.activateRoute.params
  //"id" es el nombre de la ruta que le dimos en countries-routing
  //   .subscribe(({id}) => {
  //     this.searchCountryByCode(id);
  //   })
  // }

  // searchCountryByCode(id: string): void{
  //   this.countryService.searchCountrylById(id)
  //     .subscribe( country => {
  //       this.countryCode = country
  //     })
  // }

}
