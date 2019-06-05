import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { style } from '@angular/animations';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class NgxLoginComponent extends NbLoginComponent {
}
