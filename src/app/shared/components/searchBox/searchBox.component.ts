import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-searchBox',
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject <string> = new Subject <string>();
  //esta variable es la encargada de cancelar la suscripcion (el escuchar las peticiones)
  //cada vez que te muevas entre componentes (destruyas los componentes)
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = ''

  @Input()
  public initialValue: string = ''

  @Output()
  public tagSearchEmit = new EventEmitter<string> ();

  @Output()
  public onDeounceTag = new EventEmitter<string> ();

  //encargado de hacer las emiciones
  //el debounceTime hace referencia que el emitira el valor despues de haber pasado x mili o segundo
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDeounceTag.emit(value)

    })
  }
  //componente que se llama cuando esa instancia o compoenente es destruido
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  OnvalueTag(tag: string):void{
    if(tag.length === 0) return;
    // const newSearch= this.tagInput.nativeElement.value;
    this.tagSearchEmit.emit(tag)
  }

  OnkeyPress(term: string):void{
    //next hace referencia a la siguiente mision del observable
    this.debouncer.next(term);
  }

}


