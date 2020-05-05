import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PageLoader from "components/Loader/page";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPos: {
        lat: "",
        lng: "",
      },
      center: {
        lat: "28.624827",
        lng: "77.110883",
      },
    };
  }
  componentDidMount() {
    let lastSavedLocation = localStorage.getItem("lastSavedLocation");

    if (lastSavedLocation) {
      let obj = JSON.parse(lastSavedLocation);
      this.setState({
        currentPos: obj,
      });
    }
  }

  render() {
    const { currentPos, center } = this.state;

    let pointers = [
      { lat: 28.625306, lng: 77.113301 },
      { lat: 28.6262702, lng: 77.115835 },
      { lat: 28.626151, lng: 77.114634 },
    ];

    let marker = pointers.map((point, key) => {
      return <Marker key={key} position={point} />;
    });

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={center}
        center={currentPos}
      >
        {/* <Marker position={currentPos} /> */}
        {marker}
      </Map>
    );
  }
}

const LoadingContainer = (props) => <PageLoader />;

export default GoogleApiWrapper({
  apiKey: process.env.googleAPIKey,
  LoadingContainer: LoadingContainer,
})(MapContainer);
