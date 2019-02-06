import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { User } from "../../shared/user.model";
import { LoginService } from '../../services/login.service';
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'App Médica';
  items: any = [];
  isLoggingIn = true;
  user: User;
  processing = false;

  constructor(private page: Page, private routerExtensions: RouterExtensions, private loginService: LoginService) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
    this.user.confirmPassword = '';
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }


  getUserByUserName(userName: string) {
    this.loginService.getUsersByUserName(userName)
      .subscribe((user: any) => this.login(user))
  }

  postUserRegister(user) {
    user = {
      "_id": "",
      "name": user.name,
      "lastName": user.lastName,
      "gerder": true,
      "userName": user.email,
      "email": `${user.email}@email.com`,
      "password": user.password,
      "type_user": false,
      "age": 0,
      "mobile": 0,
      "dateCreation": new Date(),
      "dateModification": new Date(),
    }

    this.loginService.postUserRegister(user)
      .subscribe((response: any) => this.registerSuccess(response))
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert("Por favor, proporcione una dirección de correo electrónico ó usuario y una contraseña.");
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.getUserByUserName(this.user.email);
    } else {
      this.register();
    }

  }

  login(response) {
    this.processing = false;
    if (response.length != 0) {
      if (this.user.email == response.userName && this.user.password == response.password) {
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
        this.alert("Bienvenido: " + response.name + " " + response.lastName);
        setString("idUser", response._id);
        setBoolean("typeUser", response.type_user);
      } else {
        this.alert("Credenciales ingresadas son incorrectas.");
      }
    } else {
      this.alert("Credenciales ingresadas son incorrectas.");
    }
  }

  public getTextName(args) {
    let textField = <TextField>args.object;
    this.user.name = textField.text;
  }

  public getTextLastName(args) {
    let textField = <TextField>args.object;
    this.user.lastName = textField.text;
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
    this.postUserRegister(this.user);
  }

  registerSuccess(user: any) {
    this.alert("Su cuenta fue creada exitosamente " + user.name + " " + user.lastName);
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
