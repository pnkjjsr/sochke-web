import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import MarkerComponent from "./marker";

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 28.6247922,
        lng: 77.1109671,
      },
      zoom: 15,
    };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          //   infoWindow.setPosition(pos);
          //   infoWindow.setContent("Location found.");
          //   infoWindow.open(map);
          //   map.setCenter(pos);
        },
        function () {
          //   handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  render() {
    const { center, zoom } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD8Qlh7nkwzPTUGvSoxMX7YlVfz-ckDRAs" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <MarkerComponent lat={28.624112} lng={77.114338} text="Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapComponent;
