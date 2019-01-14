import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";

import { User } from "../../shared/user.model";
import { UserService } from "../../shared/user.service";
import { RuleSet } from "tns-core-modules/ui/styling/css-selector/css-selector";

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
  test: string = '';
  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
    this.user.confirmPassword = '';
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
    if (this.user.email == 'admin' && this.user.password == 'admin') {
      this.routerExtensions.navigate(["/home"], { clearHistory: true });
      this.alert("Bienvenido: " + this.user.email);
    } else {
      this.alert("Credenciales ingresadas son incorrectas.");
    }
  }

  public getTextEmail(args) {
    let textField = <TextField>args.object;
    this.user.email = textField.text;
  }

  public getTextPassword(args) {
    let textField = <TextField>args.object;
    this.user.password = textField.text;
  }

  public getTextConfirmPassword(args) {
    let textField = <TextField>args.object;
    this.user.confirmPassword = textField.text;
  }

  /* 
  in the input 
  (returnPress)="onReturn($event)"
  
   public onReturn(args) {
     let textField = <TextField>args.object;
 
     console.log("onReturn");
     this.test = textField.text;
     console.log(this.test);
   } */

  register() {
    if (this.user.password != this.user.confirmPassword) {
      this.processing = false;
      this.alert("Tus contraseñas no coinciden.");
      return;
    }
    this.alert("Su cuenta fue creada exitosamente.");
    this.isLoggingIn = true;
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
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
