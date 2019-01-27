import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {  }

}
