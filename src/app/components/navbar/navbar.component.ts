import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  // Define output variable
  @Output() searchTermValue: EventEmitter<string>;

  // Navbar Switch
  burgerSwitch: boolean;

  constructor() {
    this.searchTermValue = new EventEmitter();
  }

  // Toggles Navbar Hamburger
  toggleBurger() {
    this.burgerSwitch = !this.burgerSwitch;
  }

  // Emit searchTerm to parent component
  inputValue(searchTerm: string) {
    this.searchTermValue.emit(searchTerm);
  }

}
