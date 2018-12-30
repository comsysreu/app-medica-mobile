import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { User } from "../../shared/user.model";
import { UserService } from "../../shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'App Médica';
  isLoggingIn = true;
  user: User;
  processing = false;
  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.email = "user@nativescript.org";
    this.user.password = "password";
    this.user.confirmPassword = "password";
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert("Por favor, proporcione una dirección de correo electrónico y una contraseña.");
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.processing = false;
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
    this.alert("Lamentablemente no pudimos encontrar tu cuenta.");

  }

  register() {
    if (this.user.password != this.user.confirmPassword) {
      this.alert("Tus contraseñas no coinciden.");
      return;
    }
    console.log(this.user.password)
    console.log(this.user.confirmPassword)
    this.processing = false;
    this.alert("Su cuenta fue creada exitosamente.");
    this.isLoggingIn = true;
  }

  forgotPassword() {
    prompt({
      title: "Se te olvidó tu contraseña",
      message: "Ingrese la dirección de correo electrónico que usó para registrarse para restablecer su contraseña",
      inputType: "email",
      defaultText: "",
      okButtonText: "Restablecer",
      cancelButtonText: "Cancelar"
    }).then((data) => {
      if (data.result) {
        this.alert("Su contraseña fue restablecida con éxito. Por favor, consulte su correo electrónico para obtener instrucciones sobre cómo elegir una nueva contraseña.");
      }
    });
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }
  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  alert(message: string) {
    return alert({
      title: this.title,
      okButtonText: "Aceptar",
      message: message
    });
  }

  logout() {
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
  }

}
