import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject,   } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class DataService {
  public items: any = [];
  restaurants: any;
  constructor(private db: AngularFireDatabase,private store: AngularFirestore) {
    var this_ = this;
    this.store.collection("restaurants").get().subscribe(function(querySnapshot) {
      console.log("json",querySnapshot.docs[0].data())
      this_.pushData(querySnapshot.docs);
    });
    this.restaurants = [];
    // this.items = [
    //   { title: "one" },
    //   { title: "two" },
    //   { title: "three" },
    //   { title: "four" },
    //   { title: "five" },
    //   { title: "six" }
    // ];
  }

  filterItems(searchTerm) {
    return this.restaurants.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  pushData(data) {
    var this_ = this;
    for(var i = 0; i < data.length; i++) {
      // for(var j = i+1; j < (data.length+1); j++) {
        // if(data[i].data().order > data[j].data().order) {
          this_.restaurants.push(data[i].data());
        // }
      // }
    }
    console.log("questions", this.restaurants);
  }
}