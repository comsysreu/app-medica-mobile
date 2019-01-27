import { Component, OnInit } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { User } from "../../shared/user.model";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { LoginService } from '../../services/login.service';
import { getString } from "tns-core-modules/application-settings";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  name: string = '';
  lastName: string = '';
  gender: string = '';
  email: string = '';
  userName: string = '';
  state: boolean = null;
  user: User;
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
        this.name = user.name;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.email = user.email;
        this.state = user.gerder;
        user.gerder == true ? this.gender = 'Masculino' : this.gender = 'Femenino';
        this.processing = false;
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
      "name": this.name,
      "lastName": this.lastName,
      "gerder": this.state,
      "userName": this.userName,
      "email": this.email,
      "password": '123',
      "type_user": false
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
    this.name = textField.text;
  }

  public getLastName(args) {
    let textField = <TextField>args.object;
    this.lastName = textField.text;
  }

  public getUserName(args) {
    let textField = <TextField>args.object;
    this.userName = textField.text;
  }
  public getEmail(args) {
    let textField = <TextField>args.object;
    this.email = textField.text;
  }

}
