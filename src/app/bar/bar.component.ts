import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input() name!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
