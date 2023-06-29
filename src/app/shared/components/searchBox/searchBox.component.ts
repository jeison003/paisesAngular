import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-searchBox',
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public placeholder: string = ''

  @Output()
  public tagSearchEmit = new EventEmitter<string> ();


  OnvalueTag(tag: string):void{
    if(tag.length === 0) return;
    // const newSearch= this.tagInput.nativeElement.value;
    this.tagSearchEmit.emit(tag)
  }

}


