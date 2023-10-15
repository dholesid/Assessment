import { Component } from '@angular/core';
import { JsonServiceService } from '../json-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  LoggedUser: any;

  constructor(private jsonService: JsonServiceService,private router:Router) {}

  ngOnInit() {
    this.LoggedUser = this.jsonService.getUser();
  }

  logout() {
    
    this.jsonService.setUser(null);
    this.LoggedUser = null; 
    this.router.navigate([""]);
  }
}
