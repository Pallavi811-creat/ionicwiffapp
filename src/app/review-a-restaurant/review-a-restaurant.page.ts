import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,   } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {ActivatedRoute,Router} from '@angular/router';
import 'firebase/firestore';

@Component({
  selector: 'app-review-a-restaurant',
  templateUrl: './review-a-restaurant.page.html',
  styleUrls: ['./review-a-restaurant.page.scss'],
})
export class ReviewARestaurantPage implements OnInit {

  questions: any;
  currentquestions: any;
  page_order: any;
  database: any;
  aboutus:any;
  answer: any;
  data: any;
  restaurant: any;
  weighting: any;
  restaurantnames: any;
  star: any;
  sub1="";
  sub2="";
  sub3="";
  email: any;
  rightquestions: any;
  name: any;
  reviews: any;
  distance: any;
  rating: any;
  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  ids: any;
  date = new Date();
  days: any;
  month: any;
  months: any;
  day: any;
  year: any;
  hours: any;
  minute: any;
  second: any;
  seconds: any;
  minutes: any;
  hour: any;
  perfectdate: any;
  perfecttime: any;
  id: any;
  private imageSrc1: string = '';
  private imageSrc2: string = '';
  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private store: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {
    var this_ = this;
    this.store.collection("questions").get().subscribe(function(querySnapshot) {
      this_.pushData(querySnapshot.docs);
    });
    this.store.collection("myreview").get().subscribe(function(querySnapshot) {
      this_.pushData2(querySnapshot.docs);
    });
    this.questions = [];
    this.restaurantnames = [];
    this.rightquestions = [
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      },
      {
        answer:"YES"
      }
    ];
    this.currentquestions = [];
    this.page_order = 2;
  }

  ngOnInit() {
    this.email = localStorage.getItem('token');
    this.name= this.activatedRoute.snapshot.paramMap.get("name");
    this.distance= this.activatedRoute.snapshot.paramMap.get("distance");
    this.rating= this.activatedRoute.snapshot.paramMap.get("rating");
    var this_ = this;
    this.store.collection("restaurants").get().subscribe(function(querySnapshot) {
      console.log("json",querySnapshot.docs)
      this_.pushData1(querySnapshot.docs);
    });
  }

  toggle(index){ // yes/no button
    console.log(this.questions[index].answer)
    if(this.questions[index].answer == "YES"){
      this.questions[index].answer = "NO"
      this.rightquestions[index].answer = "YES"
    }else{
      this.questions[index].answer = "YES"
      this.rightquestions[index].answer = "NO"
    }
  }
  remain() { // remain function
    var score = 0;

    this.rightquestions.map((item, index)=>{
      if(item.answer && item.answer == "YES") {
        score += 5*this.questions[index].weight;
      }
    })
    console.log("score",score)
    if(score>=0 && score<=30)this.star=5;
    if(score>30 && score<=60)this.star=4;
    if(score>60 && score<=100)this.star=3;
    if(score>100 && score<=120)this.star=2;
    if(score>120 && score<=140)this.star=1;
    this.date.setTime(Date.now());
    this.day = this.date.getDate();
    this.year = this.date.getFullYear();
    this.second = this.date.getSeconds();
    this.minute = this.date.getMinutes();
    this.hour = this.date.getHours();
    if(this.day<10){
      this.days = "0"+this.day;
    }
    else{
      this.days = this.day;
    }
    this.month = this.date.getMonth()+1;
    console.log("log",this.month)
    if(this.month<10){
      this.months="0"+this.month;
    }
    else{
      this.months=this.month;
    }
    if(this.hour<10){
      this.hours="0"+this.hour;
    }
    else{
      this.hours=this.hour;
    }
    if(this.minute<10){
      this.minutes="0"+this.minute;
    }
    else{
      this.minutes=this.minute;
    }
    if(this.second<10){
      this.seconds="0"+this.second;
    }
    else{
      this.seconds=this.second;
    }
    this.perfectdate = this.months+"-"+this.days+"-"+this.year;
    this.perfecttime = this.hours+":"+this.minutes+":"+this.seconds;

    var reviewData = {
      id:this.reviews + 1,
      name: localStorage.name,
      email: this.email,
      restaurants: this.name,
      review: this.star,
      date:this.perfectdate,
      time:this.perfecttime
    };
    var restaurantdata = {
      lastreview: this.star,
      optional:this.rightquestions[2].answer,
      sub1: this.sub1,
      sub2:this.sub2,
      sub3:this.sub3,
      date:this.perfectdate,
      time:this.perfecttime,
      image : this.imageSrc1,
      secondaryImage : this.imageSrc2
    }
    this.store.collection("myreview").add(reviewData);
    this.store.collection("restaurants").doc(this.ids).update(restaurantdata);
    this.router.navigate(['/single-review', {name:this.name,distance:this.distance,rating:this.rating,lastreview:this.star,state:1,sub1:this.sub1,optional:this.rightquestions[2].answer,sub2:this.sub2,sub3:this.sub3,first:this.imageSrc1,second:this.imageSrc2,date:this.perfectdate,time:this.perfecttime}]);
  }

  pushData(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
          this_.questions.push(data[i].data());
    }
  }

  pushData1(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
          this_.restaurantnames.push(data[i].data());
    }
    for(var i = 0; i < data.length; i++) {
      if(this.name == data[i].data().name)
          this_.ids=data[i].id;
    }
  }

  pushData2(data) { // array arrange
    var this_ = this;
          this_.reviews = data.length;
  }

  handleInputChange1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded1(e) {
    let reader = e.target;
    this.imageSrc1 = reader.result;
    console.log("src1",this.imageSrc1)
  }

  handleInputChange2(e) {
    console.log("stress")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded2(e) {
    let reader = e.target;
    this.imageSrc2 = reader.result;
    console.log("src2",this.imageSrc2)
  }
  
}
