import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email; password; passwordForConfirmation;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  signup() {
    console.log("this.fireAuth",this.fireAuth);
    if (this.password == this.passwordForConfirmation) {
      this.fireAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log("resss",res.user.email)
          localStorage.setItem("token",res.user.email);
          localStorage.setItem("password",this.password);
          localStorage.setItem("name",res.user.displayName);
          console.log(res.user);
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        console.log(`signup failed ${err}`);
      });
    }
  }

}
