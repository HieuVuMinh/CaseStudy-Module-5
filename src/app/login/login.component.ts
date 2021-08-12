import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }


  login() {
    this.authenticationService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).subscribe(() => {
      alert('Success!');
      this.router.navigateByUrl('/products');
    });
  }
}
