import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosIdx } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get("https://angular-html-7653e-default-rtdb.firebaseio.com/productos_idx.json").subscribe((resp) => {
      this.productos = resp as [];
      this.cargando = false;
      console.log(this.productos);
    });
  }
}
