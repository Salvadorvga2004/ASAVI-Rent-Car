import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../service/autos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent{
  constructor(private autoservice : AutosService){
    this.autoservice.getAutos().subscribe(autos => {console.log(autos)})
  }
  ngOnInit(){
      
  }
}
