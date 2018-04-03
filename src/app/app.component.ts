import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  // Initialize searchTerm
  searchTerm = '';

  constructor() { }

  // Get searchTerm from child component
  getSearchTerm(emittedSearchTerm: string) {
    this.searchTerm = emittedSearchTerm;
    console.log(this.searchTerm);
  }

}
