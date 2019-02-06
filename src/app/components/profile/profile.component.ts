import { Component, OnInit } from '@angular/core';
import * as Toast from "nativescript-toast";
import { TextField } from "tns-core-modules/ui/text-field";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { DoctorsService } from '../../services/doctors.service';
import { SpecialtiesService } from '../../services/specialties.service';
import { getString, getBoolean } from "tns-core-modules/application-settings";
import { userInfo } from 'os';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  item: any = {
    userId: '',
    graduation: '',
    collegiate: '',
    specialtiesId: '',
    description: '',
    score: 0,
    dateCreation: '',
    dateModification: '',
  };
  itemsSpecialties: any = [];
  specialtiesList: any = [];
  userAuth: string = '';
  typeUser: boolean = null;
  selectSpecialtie: number;
  typeEdit: boolean = null;
  title = 'App Médica';

  constructor(private doctorService: DoctorsService, private specialtiesService: SpecialtiesService) {
    this.getSpecialties();
    this.userAuth = getString("idUser");
    this.typeUser = getBoolean("typeUser");
    getBoolean("typeUser") ? this.getDoctor(this.userAuth) : console.log('typeUser', this.typeUser);
  }

  ngOnInit() {
  }

  getDoctor(userId: string) {
    this.doctorService.getDoctorId(userId)
      .subscribe((user: any) => {
        if (user.user == undefined) {
          Toast.makeText("Parece que no has llenado los campos ").show();
          this.typeEdit = false;
        } else {
          this.typeEdit = true;
          this.item = user.doctor;
          for (let i in this.itemsSpecialties) {
            if (this.itemsSpecialties[i]._id == this.item.specialtiesId) {
              this.selectSpecialtie = +i;
            }
          }
        }
      });
  }

  getSpecialties() {
    this.specialtiesService.getSpecialties()
      .subscribe((specialties) => {
        this.itemsSpecialties = specialties;
        for (let i of specialties) {
          this.specialtiesList.push(i.name);
        }
      })
  }

  public selectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    this.item.specialtiesId = this.itemsSpecialties[picker.selectedIndex]._id;
    //console.log(this.item);
  }

  public getGraduation(args) {
    let textField = <TextField>args.object;
    this.item.graduation = textField.text;
  }

  public getDescription(args) {
    let textField = <TextField>args.object;
    if (textField.text.length >= 20) {
      Toast.makeText("La descripción debe de contener únicamnte 400 carácteres. " + textField.text.length).show();
    }
    this.item.description = textField.text.substring(0, 400);
  }

  public getCollegiate(args) {
    let textField = <TextField>args.object;
    this.item.collegiate = textField.text;
  }

  postRegisterDoctor(user) {
    this.item.userId = this.userAuth;
    this.item.dateCreation = new Date();
    this.item.dateModification = new Date();
    this.doctorService.postDoctor(this.item)
      .subscribe((response: any) => {
        this.item = response;
        Toast.makeText("Su perfil ha sido actualizado éxitosamente ").show();
      })
  }

  updateDoctor(user){
    this.item.dateModification = new Date();
    this.doctorService.updateDoctor(user)
      .subscribe((response) => {
        console.log(response);
        Toast.makeText("Su perfil ha sido actualizado éxitosamente ").show();
      })
  }

  submit() {
    if (!this.item.graduation || !this.item.collegiate || !this.item.description || !this.item.specialtiesId) {
      this.alert("Por favor, llene todos los campos.");
      return;
    }
    this.typeEdit ? this.updateDoctor(this.item) : this.postRegisterDoctor(this.item);
  }

  alert(message: string) {
    return alert({
      title: this.title,
      okButtonText: "Aceptar",
      message: message
    });
  }

}
