import * as Toast from "nativescript-toast";
import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from '../../services/login.service';
import * as application from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  items: any[] = [];
  detail: boolean = false;
  item: any = {}

  constructor(private loginService: LoginService, private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.loginService.getUsers()
      .subscribe((users: any) => this.items = users);
    Toast.makeText("Datos cargados.").show();
  }

  ngOnChanges() {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
      if (this.detail) {
        args.cancel = true;
        this.detail = false;
      } else {
        args.cancel = false;
      }
      Toast.makeText("Return " + args.cancel).show();
    });
  }

  detailUser() {
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
  }

  showItem(item: any) {
    this.detail = !this.detail;
    this.detail ? this.item = item : this.item = {};
  }

}
