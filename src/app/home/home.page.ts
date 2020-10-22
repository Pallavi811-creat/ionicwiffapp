import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController,Platform } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject,   } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

// import { NavController, Platform } from 'ionic-angular';
import {Router} from '@angular/router';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx'; 
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  options : GeolocationOptions;
  currentPos : Geoposition;
  map: any;
  distance: any;
  latlng: any;
  restaurants: any;
  state: any;
  status: any;
  lists: any;
  source: any;
  ids: any;
  original: any;
  empty: any;
  plus_code: any;
  places : Array<any> ; 
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  
  constructor(private router: Router,private fb: FormBuilder,private menu: MenuController, public platform: Platform,private geolocation: Geolocation,private db: AngularFireDatabase,
    private store: AngularFirestore) {
      var this_ = this;
    this.store.collection("restaurants").get().subscribe(function(querySnapshot) { // get restaurant data
      // console.log("json",querySnapshot.docs[0].data())
      console.log("docs",querySnapshot.docs.length);
      if(querySnapshot.docs.length==0)
      {
        this_.empty = 1;
        this_.getUserPosition();
      }
      else{
        this_.empty = 0;
        this_.pushData(querySnapshot.docs);
        this_.getUserPosition();
      }
      
    });
    this.restaurants = [];
    this.ids = [];
    this.lists = [];
    this.status = [];
    this.plus_code = [];
    // platform.ready().then(() => {
    //   this.initMap();
    // });
   }

  ngOnInit() {
    // this.openFirst();
    this.distance = [];
    this.latlng = [];
  }

  pushData(data) { // array arrange
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
          this_.restaurants.push(data[i].data());
    }
    for(var i = 0; i < data.length; i++) {
          this_.ids.push(data[i].id);
    }
  }

  marginTop="margin-top: -90px;"
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  view=true;
  toggleView(){
    this.view=!this.view;
  }


  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    if(this.empty == 1){
      this.getRestaurants(latLng).then((results : Array<any>)=>{
        
        
          this.places = results;
          for(let i = 0 ;i < results.length ; i++)
          {
            this.plus_code.push(results[i].plus_code.compound_code);
              console.log("before",this.places[i].rating)
            if(this.places[i].rating == undefined)
            {
              this.places[i].rating = "";
              
              console.log("after",this.places[i].rating)
            }
            
              this.createMarker(results[i]);
              let data={
                lat:results[i].geometry.location.lat(),
                lng:results[i].geometry.location.lng()
            };
              this.latlng.push(data);
              // for(let k=0; k < this.restaurants.length ; k++)
              // {
              //   if(results[i].name == this.restaurants[k].name){
              //     newstate = 1;
              //     this.status.push(newstate);
              //   }             
              // }
              // if(newstate == 0){
              //   this.status.push(newstate);
              // }
              // newstate=0;
          }
          this.distances(this.latlng);
          this.addMarker();
      },(status)=>console.log(status));
  
      
    }
    if(this.empty == 0){
      this.getRestaurants(latLng).then((results : Array<any>)=>{
        // console.log("this",results)
        
        var newstate=0;
          this.places = results;
          for(let i = 0 ;i < results.length ; i++)
          {
        console.log("this",results[i].plus_code.compound_code)
            this.plus_code.push(results[i].plus_code.compound_code);
            console.log("before1",this.places[i].rating)
            if(this.places[i].rating == undefined)
            {
              // console.log()
              this.places[i].rating = "";
              console.log("after1",this.places[i].rating)
            }
              this.createMarker(results[i]);
              let data={
                lat:results[i].geometry.location.lat(),
                lng:results[i].geometry.location.lng()
            };
              this.latlng.push(data);
              for(let k=0; k < this.restaurants.length ; k++)
              {
                if(results[i].name == this.restaurants[k].name){
                  newstate = 1;
                  this.status.push(newstate);
                }             
              }
              if(newstate == 0){
                this.status.push(newstate);
              }
              newstate=0;
          }
          this.distances(this.latlng);
          this.addMarker();
      },(status)=>console.log(status));
  
    }
}

calculateAndDisplayRoute() {
  const that = this;
  this.directionsService.route({
    origin: this.source,
    destination: this.original,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      that.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

  // addMap(lat,long){

  //   let latLng = new google.maps.LatLng(lat, long);

  //   let mapOptions = {
  //   center: latLng,
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //   this.addMarker();
  // }

  distances(latlng){
    for(let j=0 ;j < latlng.length; j++)
    {
      this.haversine_distance(this.currentPos.coords,latlng[j]);
    }
  }

  haversine_distance(mk1, mk2) {
    var R = 6371.0710; // Radius of the Earth in miles
    var rlat1 = mk1.latitude * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.longitude) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    var num = d.toFixed(2);
    // console.log("distance",d)
    this.distance.push(num);
  }

  addMarker(){
      if(this.empty == 1){
        console.log("distance1",this.places)
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

        let content = "<p>This is your current position !</p>";          
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });console.log(this);
        for(let p=0; p < this.places.length; p++){
          var addData = {
            name: this.places[p].name,
            lastreview:0,
            optional:"",
            sub1:"",
            sub2:"",
            sub3:"",
            image:"",
            date:"",
            time:"",
            secondaryImage:"",
            rating: this.places[p].rating
          };
          this.store.collection("restaurants").add(addData);
          var listData = {
            name: this.places[p].name,
            lastreview: 0,
            distance: this.distance[p]
          }
          this.lists.push(listData);
        }
      }
      if(this.empty == 0){
        console.log("distance",this.distance,"and",this.status)
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

        let content = "<p>This is your current position !</p>";          
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });

        let place = infoWindow.addListener('click', function(mapsMousesEvent) {
          console.log("maps event",mapsMousesEvent)
          // this.original = new google.maps.mapsMouseEvent.latLng;
        });
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
        for(let l=0; l < this.status.length; l++){
          
          if(this.status[l] == 1)
          {
            //update
            var updateData = {
              rating: this.places[l].rating
            };
            this.store.collection("restaurants").doc(this.ids[l]).update(updateData);
            var listData = {
              name: this.places[l].name,
              lastreview: 0,
              distance: this.distance[l]
            }
            this.lists.push(listData);
          }
          if(this.status[l] == 0)
          {
            //add
            var addData = {
              name: this.places[l].name,
              lastreview:0,
              optional:"",
              sub1:"",
              sub2:"",
              sub3:"",
              date:"",
              time:"",
              image:"",
              secondaryImage:"",
              rating: this.places[l].rating
            };
            this.store.collection("restaurants").add(addData);
            var listData = {
              name: this.places[l].name,
              lastreview: 0,
              distance: this.distance[l]
            }
            this.lists.push(listData);
          }
        }
    }
  }

  createMarker(place)
    {
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: place.geometry.location
        });   
        // console.log("marker",marker.getPos)
        let content = "<p>"+place.name+" !</p>";          
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
    }   

  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition().then((pos : Geoposition) => {
      this.source = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.currentPos = pos;    
        console.log("pos",pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
  }

  getRestaurants(latLng)
    {
        var service = new google.maps.places.PlacesService(this.map);
        let request = {
            location : latLng,
            radius : 7000 ,
            types: ["restaurant","bar"]
        };
        return new Promise((resolve,reject)=>{
            service.nearbySearch(request,function(results,status){
                if(status === google.maps.places.PlacesServiceStatus.OK)
                {
                    resolve(results);    
                }else
                {
                    reject(status);
                }
            }); 
        });
    }

    movetopage(){
      // list-of-restaurants
      console.log("lists",this.lists)
      var myJSON = JSON.stringify(this.lists);
      this.router.navigate(['/list-of-restaurants',{lists:myJSON}])
    }

}


