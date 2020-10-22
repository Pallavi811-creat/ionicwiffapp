import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email; password;
  product;

  constructor(
    private router: Router,
    public platform: Platform,
    private fireAuth: AngularFireAuth,
    public menuCtrl: MenuController,
    private iap2: InAppPurchase2,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    // this.registerHandlersForPurchase('standard_monthly');
  }

  loginWithEmail() {
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          //alert(res.user);
          // this.checkSubscriptionState();
          console.log(res)
          localStorage.setItem("token",res.user.email);
          localStorage.setItem("password",this.password);
          localStorage.setItem("name",res.user.displayName);
          this.storage.get("trial").then((res) => { 
            // if(res != null){
              this.storage.set("mode","user");
              this.router.navigate(['/home']);    
            // }
            // else
            //   this.router.navigate(['/review-a-restaurant']);
          });
        }
      })
      .catch(err => {
        alert(`login failed ${err}`);
      });
  }

  // checkSubscriptionState() {
  //   this.iap2.verbosity = this.iap2.DEBUG;
  //   this.iap2.validator = "https://validator.fovea.cc/v1/validate?appName=com.fitguru&apiKey=9fad6b71-cc78-46d8-8253-5de7f3df3832";
  //   this.iap2.register({
  //     id: 'standard_monthly',
  //     type: this.iap2.PAID_SUBSCRIPTION
  //   });
  //   this.product = this.iap2.get('standard_monthly');
  // }

  // registerHandlersForPurchase(productId) {
  //   let self = this.iap2;
  //   this.iap2.when(productId).updated((product) => {
  //     alert('Product Info: ' + JSON.stringify(product));
  //     if (product.loaded && product.valid) {
  //       if (product.owned) {
  //         this.router.navigate(['/home']);
  //       }
  //       else {
  //         this.router.navigate(['/review-a-restaurant']);
  //       }
  //     }
  //   });
  //   this.iap2.when(productId).registered((product: IAPProduct) => {
  //     // alert(` owned ${product.owned}`);
  //   });
  //   this.iap2.when(productId).owned((product: IAPProduct) => {
  //     // alert(` owned ${product.owned}`);
  //     this.router.navigate(['/home']);
  //   });
  //   this.iap2.when(productId).expired((product: IAPProduct) => {
  //     this.router.navigate(['/review-a-restaurant']);
  //   });
  // }
}
