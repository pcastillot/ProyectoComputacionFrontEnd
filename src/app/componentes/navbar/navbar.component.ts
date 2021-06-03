import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, config: NgbDropdownConfig) { 
      config.placement = "bottom-right";
      config.autoClose = true;
  }
    
    

  ngOnInit(): void {
  }

  redirectRegistro = () =>{
    this.router.navigateByUrl('registro');
  };

  redirectLogin = () =>{
    this.router.navigateByUrl('login');
  };

  redirectInicio = () =>{
    this.router.navigateByUrl('inicio');
  };

}
