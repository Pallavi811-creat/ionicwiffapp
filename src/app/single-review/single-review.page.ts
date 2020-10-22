import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.page.html',
  styleUrls: ['./single-review.page.scss'],
})
export class SingleReviewPage implements OnInit {

  name: any;
  distance: any;
  rating: any;
  lastreview: any;
  state: any;
  optional: any;
  sub1: any;
  questions: any;
  sub2: any;
  sub3: any;
  first: any;
  second: any;
  date: any;
  time: any;

  constructor(private router: Router,private db: AngularFireDatabase,private store: AngularFirestore,private activatedRoute: ActivatedRoute) {
    var this_ = this;
    this.store.collection("questions").get().subscribe(function(querySnapshot) { // get questions
      console.log("json",querySnapshot.docs[0].data())
      this_.pushData(querySnapshot.docs);
    });
    this.questions = [];
  }

  ngOnInit() {
    this.name= this.activatedRoute.snapshot.paramMap.get("name");
    this.distance= this.activatedRoute.snapshot.paramMap.get("distance");
    this.rating= this.activatedRoute.snapshot.paramMap.get("rating");
    this.lastreview= this.activatedRoute.snapshot.paramMap.get("lastreview");
    this.state= this.activatedRoute.snapshot.paramMap.get("state");
    this.optional= this.activatedRoute.snapshot.paramMap.get("optional");
    this.sub1= this.activatedRoute.snapshot.paramMap.get("sub1");
    this.sub2= this.activatedRoute.snapshot.paramMap.get("sub2");
    this.sub3= this.activatedRoute.snapshot.paramMap.get("sub3");
    this.first= this.activatedRoute.snapshot.paramMap.get("first");
    this.second= this.activatedRoute.snapshot.paramMap.get("second");
    this.date= this.activatedRoute.snapshot.paramMap.get("date");
    this.time= this.activatedRoute.snapshot.paramMap.get("time");
    console.log("max",this.first);
    console.log("min",this.second);
  }

  givereview(name,distance,rating,lastreview){ // give review
    this.router.navigate(['/review-a-restaurant', {name:name,distance:distance,rating:rating,lastreview:lastreview,state:0,optional:this.optional,sub1:this.sub1,sub2:this.sub2,sub3:this.sub3,first: this.first,second: this.second,date: this.date,time:this.time}]);
  }

  pushData(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
      if(data[i].data().order == 3){
        this_.questions=data[i].data();
      }
    }
    console.log("order", this.questions);
  }

}
