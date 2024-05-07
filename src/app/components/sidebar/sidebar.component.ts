import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from './logo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    LogoComponent,
    MatDividerModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  openMenu: String = '';
  clicked = 0;
  prevName: String = '';

  toggleMenu(name: String) {
    this.openMenu = name;
    if (this.prevName === name) {
      this.clicked = 0;
      this.prevName = '';
    } else {
      this.clicked = 1;
      this.prevName = name;
    }
  }
}
