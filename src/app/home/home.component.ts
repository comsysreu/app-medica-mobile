import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'App Médica';

  message = " Has iniciado exitosamente";

  lastDelY = 0;
  headerCollapsed = false;
  selectedTab = null;
  selectedTabview = 0;

  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

  logout() {
    this.routerExtensions.navigate(["/login"], { clearHistory: true });
  }

  categoryIcon(itemCategory) {
    switch (itemCategory) {
      case "Burger":
        return String.fromCharCode(0xf0f5); //"fa-cutlery";
        break;
      case "Beer":
        return String.fromCharCode(0xf0fc); //"fa-beer";
        break;
      case "Pancake":
        return String.fromCharCode(0xf0f4); //"fa-coffee";
        break;
      case "Cake":
        return String.fromCharCode(0xf1fd); //"fa-birthday-cake";
        break;
      default:
        return String.fromCharCode(0xf06d); //"fa-fire";
        break;
    }
  }

  //Top nav bar tap methods
  onSearchTap() {
    this.selectedTab = 4;
    this.selectedTabview = null;
  }
  
  onBellTap() {
    this.selectedTab = 5;
    this.selectedTabview = null;
  }

  onAccount() {
    this.selectedTab = 6;
    this.selectedTabview = null;
  }
  

  onPopularTap() {
    this.selectedTabview = 0;
  }

  onCategoryTap() {
    this.selectedTabview = 1;
  }

  onPromosTap() {
    this.selectedTabview = 2;
  }

  //Bottom nav bar tap methods
  onHomeTap() {
    this.selectedTab = 0;
  }

  onCartTap() {
    this.selectedTab = 1;
  }

  onHistoryTap() {
    this.selectedTab = 2;
  }

  onAboutTap() {
    this.selectedTab = 3;
  }
}
