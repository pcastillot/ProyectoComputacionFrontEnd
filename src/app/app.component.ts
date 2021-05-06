import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  condicion: boolean = true;
  title = 'vida';

  cambiarCondicion():void{
    this.condicion=false;
  }

}
