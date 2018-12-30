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
  
  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }

    logout() {
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }
}
