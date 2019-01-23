import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { LOGIN_URL } from '../../routes/endpoint'
import { User } from "../../shared/user.model";
import { RuleSet } from "tns-core-modules/ui/styling/css-selector/css-selector";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

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
      this.alert("Por favor, proporcione una dirección de correo electrónico ó usuario y una contraseña.");
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.loginUser(this.user.email);
    } else {
      this.registerUser(this.user);
      //this.register();
    }

  }

  login(response) {
    this.processing = false;
    if(response.length != 0){
      if (this.user.email == response[0].userName && this.user.password == response[0].password) {
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
        this.alert("Bienvenido: " + response[0].name + " " + response[0].lastName);
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

  private getUsers() {
    getJSON(`${LOGIN_URL}`).then((response: any) => {
      this.items = response;
    }, (e) => {
      console.log(e);
    });
  }

  private async loginUser(userName: string) {
    await getJSON(`${LOGIN_URL}/userName/${userName}`).then((response: any) => {
      setTimeout(() => {
        this.login(response);
      }, 500);
    }, (e) => {
      console.log(e);
    });
  }

  private async registerUser(user) {
    console.log(user);
    await request({
      url: `${LOGIN_URL}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          "_id": "5c080f3966b89561f0f14b67", 
          "name": user.name,
          "lastName": user.lastName,
          "gerder": true,
          "userName": user.email,
          "email": "scastros@email.com",
          "password": user.password,
          "type_user": false
         
      })
    }).then((response) => {
      const result = response.content.toJSON();
      this.register();
    }, (e) => {
      console.log(e);
    });
  }

}
