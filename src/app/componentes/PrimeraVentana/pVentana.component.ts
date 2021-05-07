import { Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-pVentana',
    templateUrl: './pVentana.component.html',
    styleUrls: ['./pVentana.component.css']

})

export class pVentanaComponent implements OnInit{
    
    constructor(private router: Router){};

    ngOnInit(): void {
    }

    redirectLogin(){
        this.router.navigateByUrl('login');
    }

    redirectRegistro(){
        this.router.navigateByUrl('registro');
    }

}
