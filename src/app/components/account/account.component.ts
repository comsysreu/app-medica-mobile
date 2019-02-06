import { Component, OnInit } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { LoginModel } from "../../models/login.model";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { LoginService } from '../../services/login.service';
import { getString } from "tns-core-modules/application-settings";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  state: boolean = null;
  gender: string = '';
  user: LoginModel;
  processing = true;

  constructor(private loginService: LoginService) {
    let userAuth = getString("idUser");
    this.getUser(userAuth);
  }

  ngOnInit() {
  }

  getUser(userId: string) {
    this.loginService.getUsersById(userId)
      .subscribe((user: any) => {
        user.gerder == true ? this.gender = 'Masculino' : this.gender = 'Femenino';
        this.processing = false;
        this.user = user;
      })
  }


  public onFirstChecked(args) {
    let firstSwitch = <Switch>args.object;
    firstSwitch.checked == true ? this.gender = 'Masculino' : this.gender = 'Femenino'
    this.state = firstSwitch.checked;
  }

  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    let textField = <TextField>args.object;
  }

  onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;
  }

  editProfile() {
    let user = {
      "_id": getString("idUser"),
      "name": this.user.name,
      "lastName": this.user.lastName,
      "gerder": this.state,
      "userName": this.user.userName,
      "email": this.user.email,
      "password": this.user.password,
      "type_user": false,
      "age": this.user.age,
      "mobile": this.user.mobile,
      "dateCreation": this.user.dateCreation,
      "dateModification": new Date(),
    }
    this.loginService.updateUser(user)
      .subscribe((user: any) => this.alert("Perfil Editado exitosamente."));
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
      title: 'Editar Perfil',
      okButtonText: "Aceptar",
      message: message
    });
  }

  public getName(args) {
    let textField = <TextField>args.object;
    this.user.name = textField.text;
  }

  public getLastName(args) {
    let textField = <TextField>args.object;
    this.user.lastName = textField.text;
  }

  public getUserName(args) {
    let textField = <TextField>args.object;
    this.user.userName = textField.text;
  }
  public getEmail(args) {
    let textField = <TextField>args.object;
    this.user.email = textField.text;
  }

}
