import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  items = [
    {
      title: "Subscription:",
      value: "Free Trial"
    },
    {
      title: "Next Billing Date:",
      value: "01/08/20"
    },
    {
      title: "Amount:",
      value: "$6.05"
    },
  ];

  btnTitle = "Unsubscribe";

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get("trial").then((res) => { 
      if(res == "true"){
        this.btnTitle = "Subscribe";
        this.items[0].value = "Free Trial";

        this.items[1].title = "Pay Date:";
        this.items[1].value = "25/07/20";

        this.items[2].value = "";
      }
      else
        this.btnTitle = "Unsubscribe";
    });
  }
}
