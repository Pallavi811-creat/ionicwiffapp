import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation ,GeolocationOptions ,Geoposition } from '@ionic-native/geolocation/ngx'; 
declare var google;

@Component({
  selector: 'app-list-of-restaurants',
  templateUrl: './list-of-restaurants.page.html',
  styleUrls: ['./list-of-restaurants.page.scss'],
})
export class ListOfRestaurantsPage implements OnInit {
  options : GeolocationOptions;
  currentPos : Geoposition;
  map: any;
  places : Array<any> ; 
  @ViewChild('map') mapElement: ElementRef;
  restaurants: any;
  distance: any;
  rating: any;
  state=0;
  restaurantnames: any;
  filter: any;
  foodList: any;
  emptyrestaurants: any;
  lists: any;

  constructor(private router: Router,private db: AngularFireDatabase,private activatedRoute: ActivatedRoute,private store: AngularFirestore, public platform: Platform,private geolocation: Geolocation) { 
    var this_ = this;
    this.store.collection("restaurants").get().subscribe(function(querySnapshot) { // get restaurant data
      console.log("json",querySnapshot.docs.length)
      this_.pushData(querySnapshot.docs);
    });
    this.restaurants = [];
    this.emptyrestaurants = [];
  }

  ngOnInit() {
    // this.openFirst();
    this.lists = this.activatedRoute.snapshot.paramMap.get("lists");
    this.restaurantnames = JSON.parse(this.lists);
    
    console.log("newconsole",this.restaurantnames)
  }

  initializeItems() { // put array
    return this.emptyrestaurants;
  }

  filterList(evt) { //filter
    this.restaurants = this.initializeItems();
    const searchTerm = evt.srcElement.value;
    console.log("search",searchTerm)
    if (searchTerm == "") {
      return;
    }
  
    this.restaurants = this.restaurants.filter(item => { // filter by search bar
      if (item.name && searchTerm != "") {
        return (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  filterByDistance() { // distance filter
    for(let i=0; i<this.restaurants.length; i++){
      for(let j=0; j<this.restaurants.length; j++){
        if(this.restaurants[i].distance < this.restaurants[j].distance){
          let temp = this.restaurants[i];
          this.restaurants[i] = this.restaurants[j];
          this.restaurants[j] = temp;
        }
      }
    }
  }

  singlereview(name,distance,rating) { // move end-of-review page
    this.router.navigate(['/end-of-review', {name:name,distance:distance,rating:rating}]);
  }

  filterByRating() { // rating filter
    for(let i=0; i<this.restaurants.length; i++){
      for(let j=0; j<this.restaurants.length; j++){
        if(this.restaurants[i].lastreview > this.restaurants[j].lastreview){
          let temp = this.restaurants[i];
          this.restaurants[i] = this.restaurants[j];
          this.restaurants[j] = temp;
        }
      }
    }
  }
  
  pushData(data) { // array arrange
    var this_ = this;
    for(var j = 0; j < this_.restaurantnames.length; j++){
      for(var l = 0; l < data.length; l++){
        
        if(this_.restaurantnames[j].name == data[l].data().name){
          this_.state = 1;
          console.log("log1",data[l].data())
          this_.restaurants.push(data[l].data());
          this_.restaurants[j].distance = this_.restaurantnames[j].distance;
        }
      }
      if(this_.state == 0){
        console.log("log2",this_.restaurantnames[j])
        this_.restaurants.push(this_.restaurantnames[j])
      }
      this_.state = 0;
    }
    
    console.log("rest",this_.restaurants)
    for(var i = 0; i < data.length; i++) {
          this_.emptyrestaurants.push(data[i].data());
    }
  }

}


