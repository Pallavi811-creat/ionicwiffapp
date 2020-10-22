import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;
@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {
  @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    public constructor() { }

    public ngOnInit() {
      
    }
  map;
    public ngAfterViewInit() {

      setTimeout(() => {
        let platform = new H.service.Platform({
          "app_id": this.appId,
          "app_code": this.appCode
        });
        let defaultLayers = platform.createDefaultLayers();
        this.map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
            zoom: 15,
            center: { lat: this.lat, lng: this.lng }
          }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        var lineString = new H.geo.LineString();

        lineString.pushPoint({lat:52.5162, lng:13.3777});
        lineString.pushPoint({lat:52.5159, lng:13.3700});
        lineString.pushPoint({lat:52.5170, lng:13.3700});
        this.map.addObject(new H.map.Polyline(
          lineString, { style: { lineWidth:  5, strokeColor: "#2A7DEF"}}
        ));
        var pngIcon = new H.map.Icon("assets/icon/destination-flag.png");
          var parisMarker = new H.map.Marker({lat:52.5162, lng:13.3777},{
            icon: pngIcon
          });
        this.map.addObject(parisMarker);
        var pngIcon = new H.map.Icon("assets/icon/location.png");
        var parisMarker = new H.map.Marker({lat:52.5170, lng:13.3700},{
          icon: pngIcon
        });
        this.map.addObject(parisMarker);
        var pngIcon = new H.map.Icon("assets/icon/car.png");
        var parisMarker = new H.map.Marker({lat:52.5159, lng:13.3700},{
          icon: pngIcon
        });
        this.map.addObject(parisMarker);
      }, 500);
    }

}