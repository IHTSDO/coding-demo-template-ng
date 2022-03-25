import { Component, OnInit } from '@angular/core';
import { CodingSpecService } from './services/coding-spec.service';
import { ExcelService } from './services/excel.service';
import { TerminologyService } from './services/terminology.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-coding-demo-template';
  bindingsForExport: any[] = [];
  editions: any[] = [];
  languages = ['be', 'en', 'es', 'fr', 'no'];
  selectedEdition = 'Edition';
  selectedLanguage = 'en';

  constructor( private codingSpecService: CodingSpecService, public excelService: ExcelService, private terminologyService: TerminologyService ) { }

  ngOnInit(): void {
    this.bindingsForExport = [];
    let spec: any[] = this.codingSpecService.getCodingSpec();
    for (const section of spec) {
      for (const binding of section.bindings) {
        this.bindingsForExport.push({ section: section.title, title: binding.title, ecl: binding.ecl.replace(/\s\s+/g, ' ') })
      }
    }
    this.terminologyService.getCodeSystems().subscribe(response => { 
      this.editions = response.entry;
      const currentVerIndex = this.editions.findIndex(x => x.resource.title === 'International Edition SNOMED CT release 2022-02-28');
      this.selectedEdition = this.editions[currentVerIndex].resource.title;
    });
  }

  setEdition(edition: any) {
    this.selectedEdition = edition.resource.title;
    this.terminologyService.setFhirUrlParam(edition.resource.version);
  }

  setLanguage(language: string) {
    this.selectedLanguage = language;
    this.terminologyService.setLang(language);
  }
}
