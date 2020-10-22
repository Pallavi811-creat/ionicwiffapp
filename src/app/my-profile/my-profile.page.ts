import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'Firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  name = '';
  password = '';
  password_confirm = '';
  email = '';
  newemail = "";
  newpassword = "";

  minAlert = false;
  matchAlert = false;
  emailAlert = false;
  myToast: any;
  showBtn = true;

  constructor(private router: Router,
    public toastController: ToastController,
    private db: AngularFireDatabase,
    private store: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private storage: Storage) { }

  ngOnInit() {
    this.email = localStorage.getItem('token');
    this.newemail= localStorage.getItem('token');
    this.password = localStorage.getItem('password');
    this.newpassword = localStorage.getItem('password');
    if(localStorage.name != "null")
    {
      this.name = localStorage.name;
    }
    this.password_confirm = localStorage.getItem('password');
   
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

  setName(){
    var user = firebase.auth().currentUser;
    console.log("user",user,"and",this.name);
    user.updateProfile({
      displayName: this.name,
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  setEmail(){
    console.log("email",this.email)
    firebase.auth()
    .signInWithEmailAndPassword(this.newemail, this.newpassword)
    .then(function(userCredential) {
    console.log("profile",this.email,this.newemail,this.newpassword)

        userCredential.user.updateEmail(this.email)
    })
  }

  setPassword(){
    var user = firebase.auth().currentUser;
    user.updatePassword(this.password).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  begin(){
    this.setName();
    this.setEmail();
    this.setPassword();
    this.showToast();
    this.router.navigate(['/auth']);  
  }

  blured($event){
    this.showBtn = true;
  }
  
  showToast() {
    this.myToast = this.toastController.create({
      message: 'Update Successful',
      duration: 1000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

}
