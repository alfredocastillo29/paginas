import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  user = ""
  password = ""

  productosList: AngularFireList<any>;

  productos: Array<any>;

  productForm: {
    $key?: string,
    nombre: string,
    marca: string,
    categoria: string,
    precio: number,
    lote: number,
    presentacion: string
  }

  constructor(private router: Router, public firebase: AngularFireDatabase, public authFirebase: AngularFireAuth) {
    this.productForm = {
      $key: '',
      nombre: '',
      marca: '',
      categoria: '',
      precio: 0,
      lote: 0,
      presentacion: ''
    }

    this.productosList = this.firebase.list('productos')

    this.productos = [];
    /////Código para obtener los productos dados de alta
    this.productosList.snapshotChanges().subscribe(item => {
      this.productos = []
      item.forEach(producto => {
        let x: any = producto.payload.toJSON();
        x["$key"] = producto.key
        this.productos.push(x)
      })
      console.log('PRODUCTOS', this.productos)
    })



  }

  ngOnInit(): void {
  }

  irVentas() {
    this.router.navigateByUrl('/ventas')
  }

  iniciarSesion() {
    if (this.user == 'profe' && this.password == '1234') {
      //Credenciales correctas
      alert("Credenciales correctas, redirigiendo")
      this.irVentas()
    } else {
      //Credenciales son incorrectas
      alert("Credenciales incorrectas")
    }
  }

  guardarProducto() {
    if (this.productForm.$key == '') {
      delete this.productForm.$key;
      this.productosList.push(this.productForm)
      this.limpiarProducto()
      alert('EL PRODUCTO SE AGREGÓ EXITOSAMENTE')
    } else {
      let keyTemp = this.productForm.$key ? this.productForm.$key : '';

      delete this.productForm.$key;

      this.productosList.update(keyTemp, this.productForm)
      this.limpiarProducto()
      alert('EL PRODUCTO SE ACTUALIZÓ EXITOSAMENTE')
    }

    console.log('PRODUCTO EN EL FORMULARIO', this.productForm)
  }

  limpiarProducto() {
    this.productForm = {
      $key: '',
      nombre: '',
      marca: '',
      categoria: '',
      precio: 0,
      lote: 0,
      presentacion: ''
    }
  }

  editarProducto(producto: any) {
    this.productForm = producto
  }

  eliminarProducto($key: any) {
    this.productosList.remove($key)
  }

  login() {
    /*let usuarioEncontrado = false;
    for (let i = 0; i < (this.productos.length - 1); i++) {
      if (this.productos[i].nombre === this.user && this.productos[i].categoria === this.password) {
        usuarioEncontrado = true
        alert('Credenciales correctas, Bienvenido!')
        this.router.navigateByUrl('/ventas')
      }
    }
    if (!usuarioEncontrado) {
      alert('Credenciales incorrectas')
    }*/

    let usuarioCorrecto = this.productos.filter(producto => producto.nombre === this.user && producto.categoria === this.password)

    if(usuarioCorrecto.length>0){
      alert('Credenciales correctas, Bienvenido!')
      this.router.navigateByUrl('/ventas')
    }else{
      alert('Credenciales incorrectas')
    }
  }

  loginFacebook(){
    this.authFirebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

}
