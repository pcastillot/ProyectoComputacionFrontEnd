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
        for (var i = 0; i < this.router.config.length; i++) {
            var routePath:any = this.router.config[i].path;
            console.log(routePath);
        }
    }

    redirectLogin(){
        this.router.navigateByUrl('login');
    }

    redirectRegistro(){
        this.router.navigateByUrl('registro');
    }

}
