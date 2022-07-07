import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { Login } from 'src/app/clases/login';
import { AuteticacionService } from 'src/app/service/auteticacion.service';
import { environment } from 'src/environments/environment';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private autserv:AuteticacionService, private router: Router) { }

  ngOnInit(): void {

  }

  login(){
      let correo = this.loginForm.controls['email'].value;
      let contrasenia = this.loginForm.controls['password'].value;
      let datosLogin = new Login(correo, contrasenia);
      this.autserv.logged(correo,contrasenia).subscribe(
        (retorno)=>{
          
          //hacer algo si login es correcto
          //this.router.navigate(['/home']);
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 3600
          });
          window.location.href = ('/home');


        },
        (error)=>{
          Swal.fire('Error!', 'No se pudo iniciar la sesión. Verifique sus datos', 'error');
          //datos incorrectos
        }
   
      );
    // this.autserv.logged(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value);
    //this.router.navigate(['home']);
    
  }

}
