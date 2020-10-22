import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    private fireAuth: AngularFireAuth,
    public menuCtrl: MenuController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async loginWithGoogle() {
    let params;
    if (this.platform.is('android')) {
      params = {
        'webClientId': '620265575912-k7onbbopa9a9lum3rcha5vr2u68v3hc5.apps.googleusercontent.com',
        'offline': false
      }
    }
    else {
      params = {}
    }
    this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response
        this.onGoogleLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

  onGoogleLoginSuccess(idToken, accessToken) {
    const credential = accessToken ? firebase.auth.GoogleAuthProvider.credential(idToken, accessToken) : firebase.auth.GoogleAuthProvider.credential(idToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        this.storage.get("trial").then((res) => { 
          if(res != null){
            this.storage.set("mode","user");
            this.router.navigate(['/home']);    
          }
          else
            this.router.navigate(['/subscription']);
        });
      })
  }

  onGoogleLoginError(err) {
    console.log(err);
  }

  loginWithGuest(){
    this.storage.set("mode","guest").then((res) =>{
      this.router.navigate(["/subscription"]);
    });
  }

}
