import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.password;
    this.autenticacaoService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('response', value);
        this.router.navigateByUrl('/')
      },
    error: (err) => {
      console.log('error', err);
    }
  });
  }
}
