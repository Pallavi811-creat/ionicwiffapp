import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'Firebase';
// import 'firebase/firestore';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.page.html',
  styleUrls: ['./my-reviews.page.scss'],
})
export class MyReviewsPage implements OnInit {

  email: any;
  reviews: any;
  constructor(private db: AngularFireDatabase,private store: AngularFirestore) {
    this.email = localStorage.getItem('token');
    var this_ = this;
    this.store.collection("myreview").get().subscribe(function(querySnapshot) { // get review data
      console.log("json",querySnapshot.docs[0].data())
      this_.pushData(querySnapshot.docs);
    });
    this.reviews= [];
   }

  ngOnInit() {
    
  }
  pushData(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
          if(data[i].data().email == this.email)
          {
            this_.reviews.push(data[i].data());
          }
    }
  }

}
