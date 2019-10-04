import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Country } from '../country';
import { allCountriesQuery } from './queries';

interface State {
  searchTerm: string;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Country[]>([]);
  private _filteredCountries$ = new BehaviorSubject<Country[]>([]);

  private _state: State = {
    searchTerm: '',
  };

  constructor(private apollo: Apollo) {
    this._getCountriesList().subscribe((countries) => {
      this._countries$.next(countries);
      this._search$.next();
    });

    this._search$.pipe(
      switchMap(() => this._search()),
    ).subscribe(countries => {
      this._filteredCountries$.next(countries);
    });

  }

  get countries$() {
    return this._filteredCountries$.asObservable();
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _matches(item, search) {
    return item.toLocaleLowerCase().includes(search)
  }

  private _search(): Observable<Country[]> {
    const countries = this._countries$;
    return countries.pipe(
      map((countries) => {
        if (!!this._state.searchTerm) {
          const search = this._state.searchTerm.toLocaleLowerCase();
          return countries.filter(({ name, native }) => this._matches(name, search) || this._matches(native, search))
        }

        return countries;
      })
    );
  }

  private _getCountriesList(): Observable<Country[]> {
    return this.apollo.watchQuery<{ countries: Country[] }>({ query: allCountriesQuery })
      .valueChanges
      .pipe(map(({ data }) => data.countries));
  }
}
