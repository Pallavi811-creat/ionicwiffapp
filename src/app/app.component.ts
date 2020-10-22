import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { Appsflyer } from '@ionic-native/appsflyer';
import { Appsflyer } from '@ionic-native/appsflyer/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  proRoute = "/select-train";
  isGuest = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appsflyer: Appsflyer,
  ) {
    this.initializeApp();
  }

  ionViewDidEnter(){
    // AppPreferences.fetch("level").then((res) => { 
    //   if(res != null){
    //     this.proRoute = "/program"
    //   }
    // });

    // AppPreferences.fetch("mode").then((res) => { 
    //   if(res == "guest"){
    //     this.isGuest = true;
    //   }
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var options = {
        devKey: 'jWbcMmnTqQpbrSH9NHL5y9',  // your AppsFlyer devKey    
        isDebug: true,
        appId: ''           
      };
                              
      if (this.platform.is('ios')) {
        options.appId = "123456789";  // your iOS App ID in the App Store
      }

      this.appsflyer.initSdk(options).then(res =>{

      });
      
      var token = "AAAAkGq1leg:APA91bGCDYT3OIZWEDSY-y5ABiaFbxhCyYAYCZZiJFeMS4oxzQZ2WadcVN-rNpIlDrZG-hI28MxzZxxJukO-1X1y5IT3b8bzNl94zH_XgrTCHTueZ0h83YMkEUjIY2hCGPsVon-ixZ2J";
      this.appsflyer.enableUninstallTracking(token);
      // this.fcm.getToken().then(token => {
      //   alert("yes");
      // });
    // var eventName = 'af_add_to_cart';
    // var eventValues = {
    // 'af_content_id': 'id123',
    // 'af_currency': 'USD',
    // 'af_revenue': '2'
    // };
    // this.appsflyer.trackEvent(eventName, eventValues);
    //   // alert("yes");
    });
  }

}
