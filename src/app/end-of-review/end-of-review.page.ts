import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-end-of-review',
  templateUrl: './end-of-review.page.html',
  styleUrls: ['./end-of-review.page.scss'],
})
export class EndOfReviewPage implements OnInit {

  users = [
    {
      name: "John",
      review: 5
    },
    {
      name: "Smith",
      review: 4
    },
    {
      name: "Martin",
      review: 5
    },
    {
      name: "John",
      review: 4
    },
    {
      name: "John",
      review: 3
    },
    {
      name: "John",
      review: 5
    },
    {
      name: "John",
      review: 5
    },
  ];
  name: any;
  email: any;
  restaurants: any;
  reviews: any;
  rating: any;
  distance: any;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private db: AngularFireDatabase,private store: AngularFirestore) {
    this.email = localStorage.getItem('token');
    var this_ = this;
    this.store.collection("myreview").get().subscribe(function(querySnapshot) { // get review
      // console.log("json",querySnapshot.docs[0].data())
      if(querySnapshot.docs.length==0)
      {
        this.reviews= [];
      }
      else{
        this_.pushData(querySnapshot.docs);
      }
    });
    this.reviews= [];
  }

  ngOnInit() {
    this.name= this.activatedRoute.snapshot.paramMap.get("name");
    this.distance= this.activatedRoute.snapshot.paramMap.get("distance");
    this.rating= this.activatedRoute.snapshot.paramMap.get("rating");
    var this_ = this;
    this.store.collection("restaurants").get().subscribe(function(querySnapshot) { // get restaurant data
      console.log("json",querySnapshot.docs[0].data())
      this_.pushData1(querySnapshot.docs);
    });
  }

  move(){ // move single-review page
    this.router.navigate(['/single-review', {name:this.name,rating:this.rating,distance:this.distance,lastreview:this.restaurants.lastreview,state:0,optional:this.restaurants.optional,sub1:this.restaurants.sub1,sub2:this.restaurants.sub2,sub3:this.restaurants.sub3,first:this.restaurants.image,second:this.restaurants.secondaryImage,date:this.restaurants.date,time:this.restaurants.time}]);
  }

  singlereview(name,distance){
    this.router.navigate(['/review-a-restaurant', {name:name,distance:distance,rating:0,lastreview:0,state:0,optional:"",sub1:"",sub2:"",sub3:"",first: "",second: "",date: "",time: ""}]);
  }

  pushData(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
      if(i<10){

        if(data[i].data().restaurants == this.name)
        {
          this_.reviews.push(data[i].data());
        }
      }
    }
  }

  pushData1(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
          if(data[i].data().name == this.name)
          {
            this_.restaurants=data[i].data();
          }
    }
  }

}
