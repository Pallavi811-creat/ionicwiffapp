import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-select-measurement',
  templateUrl: './select-measurement.page.html',
  styleUrls: ['./select-measurement.page.scss'],
})
export class SelectMeasurementPage implements OnInit {

  showHelp = false;
  next = 0;
  showBar = true;

  datas = [
    {
      img:'form-calender-icon.png',
      placeholder:'AGE',
      unit:'Year',
      value:''
    },
    {
      img:'form-height-icon.png',
      placeholder:'HEIGHT',
      unit:'cm',
      value:''
    },
    {
      img:'form-weight-icon.png',
      placeholder:'WEIGHT',
      unit:'kg',
      value:''
    },
    {
      img:'form-weist-icon.png',
      placeholder:'WAIST',
      unit:'cm',
      value:''
    },
    {
      img:'form-hip-icon.png',
      placeholder:'HIP',
      unit:'cm',
      value:''
    }
  ];

  update_success = false;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  funcUpdate(){
    this.next = 0;
    this.datas.forEach(element=>{
      if (element.value == '')
        this.next++;
      else
        this.storage.set("measurement"+this.next,element.value);
    });
    if(this.next == 0){
      this.router.navigate(['/question']);
    }
    
  }

  goBack(){
    this.navCtrl.pop();
  }

  focused(param){
    this.showBar = false;
  }

  blured(param){
    this.showBar = true;
  }

}
