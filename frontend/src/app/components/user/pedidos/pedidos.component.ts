import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {CrearComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
// import {EditarComponent} from './editar/editar.component'
import {PedidosService} from '../../../services/pedido.service'
import {DetallesPedidosService} from '../../../services/detalles_pedidos..service'
import {PreciosService} from '../../../services/precios.service'
import {ProductosService} from '../../../services/productos.service'
import {DataSource} from '@angular/cdk/collections';
import {VerComponent} from './ver/ver.component'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    dataSource:DataSource<any>;
    nodata:boolean=false
    displayedColumns: string[] = ['fecha_pedido','producto','cantidad','precio' ,'estado','options'];
    categorias:any=[];
    constructor(
        private categoriaService:CategoriaService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,  
        private pedidosService:PedidosService,
        private detallesPedidos:DetallesPedidosService,
        private precioService: PreciosService,
        private productosService: ProductosService,
        public dialog: MatDialog  
    ){
    }
    buscar(event:any){
        const categories = this.categorias;
        this.dataSource = categories.filter((category:any)=>{
            const categoryS = JSON.stringify(category);
            return categoryS.indexOf(event.target.value)===-1?false:true;
        });

    }
    transformTipoUsuario(id_tipo_usuario:number){
        switch (id_tipo_usuario){
            case 1:
                return "Usuario"
            case 2:
                return "Empresa"
            case 3:
                return "Administrador"
        }
    }
    ngOnInit(){
        this.loadingBar.start()
        this.pedidosService.getByCondition({condition:{where:{
            borrado:0,
            usuarioIdUsuarios:localStorage.getItem("id_usuarios"),
        }}}).subscribe( async(response:any)=>{
            console.log(response.payload)
            this.loadingBar.complete()
            console.log(response.payload.length === 0)
            if(response.payload.length === 0){
                this.dataSource = null
                this.nodata = true
            }else{
                this.categorias = response.payload
                this.dataSource = response.payload
            }
        },
        err=>console.log(err));
    }
    
    setDataSource(i:string,length:string){
        // console.log((parseInt(i)+1) === parseInt(length))
        if((parseInt(i)+1) === parseInt(length)){
            this.dataSource = this.categorias
        }
    }

    // goPayment(pedido:any){
    //     console.log(pedido)
    //     this.precioService.id_productos=parseInt(pedido.producto.id_productos)
    //     this.detallesPedidos.id_detalles_pedidos=parseInt(pedido.detalle.id_detalles_pedidos)
    //     console.log(this.precioService.id_productos)
    //     this.router.navigate(['/detalle-pedido'])
    // }

    goPayment(pedido:any){
        this.snackBar.success("Generando link.","")
        this.pedidosService.generarLink({monto:pedido.precio,pedidoID:pedido.id_pedidos}).subscribe((response:any)=>{
        console.log(response.payload)
        window.location.href = response.payload;
        },
        err=>{
          console.log(err)
          this.snackBar.err("A ocurrido un error.","X")
        })
      }

    verPlantilla(plantilla){
        const dialogRef = this.dialog.open(VerComponent, {
            width: '80%',
            height:"80%",
            data:{imagenes:plantilla}
          });
    }
    eliminar(id:string){
        console.log(id)
        const dialogRef = this.dialog.open(DesicionComponent, {
            width: '400px',
            data:{text:"¿Desea eliminar este pedido?"}
          });
      
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            if(result==="true"){
                this.loadingBar.start()
                this.pedidosService.delete(id).subscribe((response:any)=>{
                    console.log(response)
                    this.loadingBar.complete()
                    this.snackBar.success("Pedido eliminado.","")
                    this.ngOnInit();
                })
            }else{
                this.ngOnInit();
            }
            
        });
    }
    setCategoria(id:string){localStorage.setItem('categoria',id)}   
}