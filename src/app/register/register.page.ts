import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  password = '';
  password_confirm = '';
  email = '';

  minAlert = false;
  matchAlert = false;
  emailAlert = false;

  showBtn = true;

  constructor(private router: Router,
    private storage: Storage
    //private appsPreference: AppPreferences
    ) { }

  ngOnInit() {
  }

  editPassword(param){
    if(this.password.length < 6)
      this.minAlert = true;
    else
      this.minAlert = false;
    if(this.password != this.password_confirm)
      this.matchAlert = true;
    else
      this.matchAlert = false;
    this.showBtn = false;
  }

  changeEvent(){
    if(this.password.length < 6)
      this.minAlert = true;
    else
      this.minAlert = false;
    if(this.password != this.password_confirm)
      this.matchAlert = true;
    else
      this.matchAlert = false;
  }

  editEmail(param){
    
    if(this.email.includes('@') && this.email.includes('.com'))
      this.emailAlert = false;
    else
      this.emailAlert = true;
    this.showBtn = false;
  }

  changeEmailEvent(){
    if(this.email.includes('@') && this.email.includes('.com'))
      this.emailAlert = false;
    else
      this.emailAlert = true;
  }

  begin(){
    if(!this.minAlert && !this.emailAlert && !this.matchAlert){
      this.storage.set("registered", "true");
      this.router.navigate(['/program']);
    }
  }

  blured($event){
    this.showBtn = true;
  }

}
