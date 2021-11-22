import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() style: 'primary' | 'green' | 'yellow' | 'blue' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  constructor() {}

  ngOnInit(): void {}
}
