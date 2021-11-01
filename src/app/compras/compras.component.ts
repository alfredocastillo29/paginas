import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  user = ""
  password = ""

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  irVentas(){
    this.router.navigateByUrl('/ventas')
  }

  iniciarSesion(){
    if(this.user == 'profe' && this.password == '1234'){
      //Credenciales correctas
      alert("Credenciales correctas, redirigiendo")
      this.irVentas()
    }else{
      //Credenciales son incorrectas
      alert("Credenciales incorrectas")
    }
  }

}
