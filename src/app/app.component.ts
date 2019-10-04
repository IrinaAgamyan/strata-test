import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryService } from './service/country.service';
import { Country } from './country';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('countriesTable', { static: false }) table: any;
  countries$: Observable<Country[]>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
