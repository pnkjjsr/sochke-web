import React, { Component } from "react";

import { service } from "apiConnect";
import authSession from "utils/authSession";

// import MyMapComponent from "./googleMapsReact";
import Button from "components/Form/Button";
// import MarkerComponent from "./marker";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLocation: "",
      center: "",
      zoom: 15,
    };
  }
  componentDidMount() {
    let checkLocationAccess = sessionStorage.getItem("locationAccess");

    if (checkLocationAccess) {
      this.setState({
        displayLocation: "d-none",
      });
    }
  }

  handleGetLocation = () => {
    let session = new authSession();
    let _this = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem("lastSavedLocation", JSON.stringify(pos));

          let userIP = session.getIP();
          let data = {
            ip: userIP,
          };
          service
            .post("/covidUser-add", data)
            .then((res) => {
              sessionStorage.setItem("locationAccess", true);

              _this.setState({
                center: pos,
                displayLocation: "d-none",
              });
            })
            .catch((err) => {
              console.log(err);
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

  handleLocation = (address, area) => {
    console.log(e);
  };

  render() {
    const mainClass = "map_component";
    const { displayLocation, center, zoom } = this.state;

    return (
      // Important! Always set the container height explicitly
      <div className={mainClass}>
        {/* <MyMapComponent pos={center} /> */}

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
              area near you.
            </figcaption>
          </figure>

          <div className="form">
            <label htmlFor="Can we Access your location?">
              Can you tell your location?
            </label>

            <Button
              text="Turn on location"
              variant="btn-success"
              action={this.handleGetLocation}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapComponent;
