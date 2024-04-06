import { Component } from '@angular/core';
import { TipoAutos } from '../../modelos/tipoAuto';
import { TipoAutoService } from '../../service/tipo-auto.service';
import { Marcas } from '../../modelos/marca';
import { MarcaService } from '../../service/marca.service';



@Component({
  selector: 'app-tipo-auto',
  templateUrl: './tipo-auto.component.html',
  styleUrl: './tipo-auto.component.css'
})
export class TipoAutoComponent {
  
  
  tipoAutos: TipoAutos[]=[];
  tipoAuto: TipoAutos | any = {};

  marcas: Marcas[]=[];
  marca: Marcas | any = {};
  

  modoEdicion: boolean = false;
  modoEdicionCliente: boolean = false;
  modoEdicionUsuario: boolean = false;
  modoEdicionMarca: boolean = false;
  showFormAndTable: boolean = false; 
  showClientes: boolean = false; 
  showButton: boolean = true;
  usuariosDisponibles: string[] = [];

  filtro: string = '';
  
  constructor(private tipoAutoService: TipoAutoService, private marcaService: MarcaService){}

  


  ngOnInit(): void {
    
    this.cargarTipoAuto();
    this.cargarMarcas();
    
  }
   


  resetForm() {
    this.tipoAuto = {};
    this.modoEdicionCliente = false;
   
  }

  resetFormMarca() {
    this.marca = {};
    this.modoEdicionMarca = false;
   
  }

  //Usuarios
  cargarMarcas() {
    this.marcaService.getMarcas().subscribe(
      marcas => {

        if (this.filtro.trim() !== '') {
          marcas = marcas.filter(marca => 
            marca.NomMarca && marca.NomMarca.toLowerCase().includes(this.filtro.toLowerCase())
          );
        }

        
        this.marcas = marcas;
      },
      error => {
        console.error('Error al cargar marcass:', error);
      }
    );
}

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

addMarcas() {
  if (this.modoEdicionMarca) {
      this.marcaService.updateMarca(this.marca).subscribe(() => {
          this.resetFormMarca();
          this.cargarMarcas();
      });
  } else{
    const dataUsu = {
      
      NomMarca: this.marca.NomMarca
      
    }
    this.marcaService.addMarca(dataUsu).subscribe(() => {
      this.resetFormMarca();
      this.cargarMarcas();
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


  deleteMarca(_id?: String) {
    const conf = confirm('Estas seguro de eliminar esta marca?')
    if (conf){
      if (_id) {
        this.marcaService.deleteMarca(_id).subscribe(
          () => {
            this.marcas = this.marcas.filter(marca => marca._id !== _id);
            this.resetFormMarca();
          },
          error => {
            console.error('Error al eliminar marca:', error);
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

  editarMarca(marca: Marcas) {

    this.modoEdicionMarca = true;
    this.marca = { ...marca };
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
