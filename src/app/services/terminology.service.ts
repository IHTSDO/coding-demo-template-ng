import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminologyService {

  snowstormFhirBase = 'https://snowstorm.ihtsdotools.org/snowstorm/snomed-ct/fhir';
  defaultFhirUrlParam = 'http://snomed.info/sct'; // 'http://snomed.info/sct/11000221109/version/20211130'
  fhirUrlParam = this.defaultFhirUrlParam;
  lang = 'en';

  constructor(private http: HttpClient) { }

  setFhirUrlParam(url: string) {
    this.fhirUrlParam = url;
  }

  setLang(lang: string) {
    this.lang = lang;
  }

  getCodeSystems() {
    let requestUrl = `${this.snowstormFhirBase}/CodeSystem`;
    return this.http.get<any>(requestUrl)
      .pipe(
        catchError(this.handleError<any>('getCodeSystems', {}))
      );
  }

  expandValueSet(ecl: string, terms: string): Observable<any> {
    let requestUrl = `${this.snowstormFhirBase}/ValueSet/$expand?url=${this.fhirUrlParam}?fhir_vs=ecl/${encodeURIComponent(ecl)}&count=20&includeDesignations=true&filter=${terms}&designation=${this.lang}`
    return this.http.get<any>(requestUrl)
      .pipe(
        catchError(this.handleError<any>('expandValueSet', {}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
