import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-menu-panel',
  templateUrl: './list-menu-panel.component.html',
  styleUrls: ['./list-menu-panel.component.css']
})
export class ListMenuPanelComponent implements OnInit {


  @ViewChild('listView')
  public listView: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  public redirect(ruta: string){
    this.router.navigateByUrl(ruta)
  }
    
    

}
