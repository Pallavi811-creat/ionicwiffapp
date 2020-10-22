import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-restaurant-test',
  templateUrl: './list-of-restaurant-test.page.html',
  styleUrls: ['./list-of-restaurant-test.page.scss'],
})
export class ListOfRestaurantTestPage implements OnInit {

  allrestaurants = [
    {
      name: "Restaurant1",
      distance: 10,
      rating: 5
    },
    {
      name: "Restaurant2",
      distance: 9,
      rating: 5
    },
    {
      name: "Restaurant3",
      distance: 8,
      rating: 5
    },
    {
      name: "Restaurant4",
      distance: 6,
      rating: 5
    },
    {
      name: "Restaurant5",
      distance: 7,
      rating: 5
    },
    {
      name: "Restaurant6",
      distance: 6,
      rating: 5
    },
    {
      name: "Restaurant7",
      distance: 7,
      rating: 5
    },
  ];
  restaurants: any;
  distance: any;
  rating: any;

  constructor() { }

  ngOnInit() {
    this.restaurants = this.allrestaurants;
  }

  filter() {
    console.log("here")
    this.restaurants = [];
    for(var i=0; i<this.allrestaurants.length; i++){
      if(this.distance?this.distance == this.allrestaurants[i].distance:true && this.rating?this.rating == this.allrestaurants[i].rating:true){
        this.restaurants.push(this.allrestaurants[i]);
      }
    }
  }

}