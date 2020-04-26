import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import Button from "components/Form/Button";
import MarkerComponent from "./marker";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLocation: "",
      center: {
        lat: 28.6232186,
        lng: 77.1121557,
      },
      zoom: 15,
    };
  }

  handleGetLocation = () => {
    let _this = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem("lastSavedLocation", JSON.stringify(pos));

          _this.setState({
            center: pos,
            displayLocation: "d-none",
          });
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
    const mainClass = "map_component";
    const { displayLocation, center, zoom } = this.state;

    return (
      // Important! Always set the container height explicitly
      <div className={mainClass}>
        {/* Get Location Access */}
        <div className={`${mainClass}__location ${displayLocation}`}>
          <figure>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fcovid%2Fcovid-location.gif?alt=media"
              alt="Covid Location Access"
            />
            <figcaption>
              You can check infected
              <br />
              area near you?
            </figcaption>
          </figure>

          <div className="form">
            <label htmlFor="Can we Access your location?">
              Can we access your location?
            </label>

            <Button
              text="Turn on location"
              variant="btn-success"
              action={this.handleGetLocation}
            />
          </div>
        </div>

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD8Qlh7nkwzPTUGvSoxMX7YlVfz-ckDRAs" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <MarkerComponent lat={28.625306} lng={77.113301} text="Marker" />
          <MarkerComponent lat={28.6262702} lng={77.115835} text="Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapComponent;
