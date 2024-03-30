import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion = {} as ProductoDescripcion;
  productoId: string = "";
  constructor(private route: ActivatedRoute,
    public _producto: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._producto.getProducto(params['id']).subscribe((resp) => {
        this.productoId = params['id'];
        this.producto = resp as ProductoDescripcion;
      });
    });
  }

}
