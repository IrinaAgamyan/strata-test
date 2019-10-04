import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    NgxDatatableModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_apollo: Apollo, _httpLink: HttpLink) {
    _apollo.create({
      link: _httpLink.create({uri: 'https://countries.trevorblades.com/'}),
      cache: new InMemoryCache(),
    });
  }
}
