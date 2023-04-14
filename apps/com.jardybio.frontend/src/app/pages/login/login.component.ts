import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthFacade } from '../../store/auth/auth.facade.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      // Récupération des valeurs du formulaire
      const login = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authFacade.auth({
        login,
        password,
      });
    } else {
      // Afficher un message d'erreur si le formulaire n'est pas valide
      alert('Veuillez remplir correctement le formulaire');
    }
  }
}
