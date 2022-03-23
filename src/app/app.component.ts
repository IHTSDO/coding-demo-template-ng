import { Component, OnInit } from '@angular/core';
import { CodingSpecService } from './services/coding-spec.service';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-coding-demo-template';
  bindingsForExport: any[] = [];

  constructor( private codingSpecService: CodingSpecService, public excelService: ExcelService ) { }

  ngOnInit(): void {
    this.bindingsForExport = [];
    let spec: any[] = this.codingSpecService.getCodingSpec();
    for (const section of spec) {
      for (const binding of section.bindings) {
        this.bindingsForExport.push({ section: section.title, title: binding.title, ecl: binding.ecl.replace(/\s\s+/g, ' ') })
      }
    }
  }
}
