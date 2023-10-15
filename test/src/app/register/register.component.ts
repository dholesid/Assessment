import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonServiceService } from '../json-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private jsonServiceService: JsonServiceService) {
    this.registrationForm = fb.group({
      Username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      this.jsonServiceService.UserSignup(this.registrationForm.value).subscribe((data)=>{
console.log(data);
this.jsonServiceService.setUser(data);

if(data)
{
  this.router.navigate(["/Home"])
}
      },(err)=>{
        console.log(err);
        
      });
    } else {
      console.error('Form is invalid');
    }
  }

  GoTo_login() {
    this.router.navigate(['./login']);
  }
}
