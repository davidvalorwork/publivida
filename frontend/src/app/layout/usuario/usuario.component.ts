import {
  Component,
} from '@angular/core';
import {UsuarioService} from '../../services/usuarios.service'
import {environment} from '../../../environments/environment'
import {ProductosService} from '../../services/productos.service'
import {CategoriaService} from '../../services/categorias.service'
import {FilterService} from '../../services/filter.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent  {
  url_usuario_img:string = '';
  url_api:string = `${environment.URL_API}/`
  registrado:boolean=false;
  categorias = []
  nombre_usuario:string;
  categoria;
  busqueda:string="";

  categorias2:any;
  productos:any;
  productosRes:any

  constructor(
    public usuarioService: UsuarioService,
    public categoriaService: CategoriaService,
    public productoService: ProductosService,
    public filterService:FilterService,
    public router:Router,
  ) {
    const id_usuarios = localStorage.getItem("id_usuarios")
    console.log(id_usuarios)
    this.categoriaService.getByCondition({condition:{where:{borrado:0}}}).subscribe((response:any)=>{
      this.categorias = response.payload
    })
    if(id_usuarios){
      this.registrado = true
      this.usuarioService.getUsuario(id_usuarios).subscribe((response:any)=>{
        console.log(response.payload)
        response.payload.url_img ===null?null:this.url_usuario_img = response.payload.url_img
        console.log(this.url_usuario_img)
        this.nombre_usuario = response.payload.usuario
      })
    }
    this.categoriaService.getByCondition({condition:{where:{borrado:0}}})
    .subscribe((response:any)=>{
      console.log(response)
      this.categorias2 = response.payload

      this.productoService.getByCondition({condicion:{where:{borrado:0}}}).subscribe((response:any)=>{
        this.productos = response.payload
        for(let i in this.categorias){
          this.categorias[i].productos = []
          for(let x in this.productos){
            this.productos[x].categoriaIdCategorias===this.categorias[i].id_categorias?this.categorias[i].productos.push(this.productos[x]):null
          }
        }
        this.productosRes = response.payload
        console.log(this.productos)
        console.log(this.categorias)
        for(let i in this.productos){
          const categoria = this.search_array(this.categorias,this.productos[i].categoriaIdCategorias)
          this.productos[i].categoria = categoria.nombre_categoria
        }
      })
    })
  }

  logout(){
    localStorage.clear()
  }
  buscar(categoria:any){
    this.categoria = categoria
    setTimeout(()=>{
      this.filterService.updateData(categoria);
    },500)
  }
  buscar2(){
    setTimeout(()=>{
      console.log(this.busqueda)
      this.filterService.updateData(this.busqueda);
    },500)
  }
  search_array(array,valuetofind) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['id_categorias'] === valuetofind) {
            return array[i];
        }
    }
  }


}
