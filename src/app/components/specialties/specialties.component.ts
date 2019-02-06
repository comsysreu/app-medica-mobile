import { Component, OnInit } from '@angular/core';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {

  items:any = [];
  constructor(private specialtiesService: SpecialtiesService) { 
    this.getSpecialties();
  }

  ngOnInit() {
  }

  getSpecialties(){
    this.specialtiesService.getSpecialties()
      .subscribe((response)=> {
        this.items = response;
        console.log(response);
      })
  }

}
