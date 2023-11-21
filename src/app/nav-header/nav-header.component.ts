import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {
  
  constructor(
    private router: Router
  ) { }

  isCurrent(route: string): boolean {
    return this.router.url === route;
  }
}
