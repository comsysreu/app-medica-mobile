import { Component, OnInit } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { User } from "../../shared/user.model";
import { alert, prompt } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  Name: string = 'Julia';
  lastName: string = 'Rodríguez';
  gender: string = 'Femenino';
  Email: string = 'ejemplo@email.com';
  state:boolean = false;
  user: User;
  constructor() {
    this.state == true ? this.gender = 'Masculino' : this.gender = 'Femenino' 
  }

  ngOnInit() {
  }


  public onFirstChecked(args) {
    let firstSwitch = <Switch>args.object;
    firstSwitch.checked == true ? this.gender = 'Masculino' : this.gender = 'Femenino' 
}

  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    let textField = <TextField>args.object;
  }

  onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;
  }

  editProfile(){
    this.alert("Perfil Editado exitosamente.");
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

}
