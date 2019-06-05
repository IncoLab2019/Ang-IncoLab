import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  usuario = {};

  constructor(private sidebarService: NbSidebarService, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        this.usuario = token.getPayload();
      });
   }

  ngOnInit() {
  }
  //función que realiza deslizamiento del menú
  toggleSidebar(): boolean {
      this.sidebarService.toggle(false, 'menu-sidebar');
      return false;
  }
}
