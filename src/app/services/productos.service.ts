import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosIdx } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosIdx[] = [];
  productosFiltrado: ProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get("https://angular-html-7653e-default-rtdb.firebaseio.com/productos_idx.json").subscribe((resp) => {
        this.productos = resp as [];
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-7653e-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        // despues de cargar productos
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
