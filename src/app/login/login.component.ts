import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface loginacc{
  username:string;
  password:string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginAcc: loginacc = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  Login() {
    const { username, password } = this.loginAcc;
    if (username === 'admin' && password === 'admin') {
      this.router.navigate(['/Main']);
    } else {
      alert('Invalid credentials');
    }
  }
}
