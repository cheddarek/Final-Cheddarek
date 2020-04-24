import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  picturePath:string="../../assets/images/avatar.png";
  constructor() { }

  ngOnInit(): void {
  }

}
