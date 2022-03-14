import { Component, Input, OnInit } from '@angular/core';
import { TerminologyService } from '../terminology.service';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-autocomplete-binding',
  templateUrl: './autocomplete-binding.component.html',
  styleUrls: ['./autocomplete-binding.component.css']
})
export class AutocompleteBindingComponent implements OnInit {
  formControl = new FormControl();
  autoFilter: Observable<any> | undefined;
  Items: string[] = [];
  @Input() binding: any;

  constructor(private terminologyService: TerminologyService) { }

  ngOnInit(): void {
    this.autoFilter = this.formControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>  {
        this.Items = [];
        let response = this.terminologyService.expandValueSet(this.binding.ecl, term)
        return response;
      })
    );  
  }

}
