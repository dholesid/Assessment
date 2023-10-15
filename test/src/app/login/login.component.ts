

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonServiceService } from '../json-service.service';

interface User {
  Username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jsonService: JsonServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('Username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;

        this.jsonService.UserLogin(username, password).subscribe(
          (users: User[]) => {
            const user = users.find(user => user.Username === username && user.password === password);
            if (user) {
              this.jsonService.setUser(user);
              this.router.navigate(["/Home"]);
              console.log('Login successful:', user);
            } else {
              console.log('Invalid username or password');
            }
          },
          (error) => {
            console.error('Error during login:', error);
          }
        );
      }
    }
  }

  GoTo_register() {
    this.router.navigate(['/Register']);
  }
}
