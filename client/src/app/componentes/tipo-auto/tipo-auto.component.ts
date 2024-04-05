import { Component } from '@angular/core';
import { TipoAutos } from '../../modelos/tipoAuto';
import { TipoAutoService } from '../../service/tipo-auto.service';

@Component({
  selector: 'app-tipo-auto',
  templateUrl: './tipo-auto.component.html',
  styleUrl: './tipo-auto.component.css'
})
export class TipoAutoComponent {
  
  
  tipoAutos: TipoAutos[]=[];
  tipoAuto: TipoAutos | any = {};

  

  modoEdicion: boolean = false;
  modoEdicionCliente: boolean = false;
  modoEdicionUsuario: boolean = false;
  showFormAndTable: boolean = false; 
  showClientes: boolean = false; 
  showButton: boolean = true;
  usuariosDisponibles: string[] = [];

  filtro: string = '';
  
  constructor(private tipoAutoService: TipoAutoService){}

  


  ngOnInit(): void {
    
    this.cargarTipoAuto();
    
  }
   


  resetForm() {
    this.tipoAuto = {};
    this.modoEdicionCliente = false;
   
  }

  //Usuarios
  cargarTipoAuto() {
    this.tipoAutoService.getTipoAutos().subscribe(
      tipoAutos => {

        if (this.filtro.trim() !== '') {
          tipoAutos = tipoAutos.filter(tipoAuto => 
            tipoAuto.Tipo && tipoAuto.Tipo.toLowerCase().includes(this.filtro.toLowerCase())
          );
        }

        
        this.tipoAutos = tipoAutos;
      },
      error => {
        console.error('Error al cargar tipo de autos:', error);
      }
    );
}


  addTipoAutos() {
    if (this.modoEdicionUsuario) {
        this.tipoAutoService.updateTipoAuto(this.tipoAuto).subscribe(() => {
            this.resetFormAdmin();
            this.cargarTipoAuto();
        });
    } else{
      const dataUsu = {
        
        Tipo: this.tipoAuto.Tipo
        
      }
      this.tipoAutoService.addTipoAutos(dataUsu).subscribe(() => {
        this.resetFormAdmin();
        this.cargarTipoAuto();
      });
      
       
    }
}

  deleteTipoAuto(_id?: String) {
    const conf = confirm('Estas seguro de eliminar este tipo de auto?')
    if (conf){
      if (_id) {
        this.tipoAutoService.deleteTipoAuto(_id).subscribe(
          () => {
            this.tipoAutos = this.tipoAutos.filter(tipoAuto => tipoAuto._id !== _id);
            this.resetFormAdmin();
          },
          error => {
            console.error('Error al eliminar el tipo de auto:', error);
          }
        );
      } else {
        console.error("El correo del aministrador es inexistente.");
      }
    }

    return ;
  }

  editarTipoAuto(tipoAuto: TipoAutos) {

    this.modoEdicionUsuario = true;
    this.tipoAuto = { ...tipoAuto };
  }


  resetFormAdmin() {
    this.tipoAuto = {};
    this.modoEdicionUsuario = false;
   
  }

  verAdmin() {
    this.showFormAndTable = !this.showFormAndTable;
  }
  verClientes() {
    this.showClientes = !this.showClientes;
  }
  ocultarBoton() {
    this.showButton = false;
 }
 mostrarBoton() {
  this.showButton = true;
 }


}
