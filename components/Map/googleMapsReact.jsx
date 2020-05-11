import React, { Component, Fragment } from "react";
import { Map, Marker, Circle, GoogleApiWrapper } from "google-maps-react";
import PageLoader from "components/Loader/page";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPos: {
        lat: 28.624827,
        lng: 77.110883,
      },
      center: {
        lat: 28.624827,
        lng: 77.110883,
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
    const { pos } = this.props;

    let pointers = [
      { lat: 28.625306, lng: 77.113301 },
      { lat: 28.6262702, lng: 77.115835 },
      { lat: 28.626151, lng: 77.114634 },
      { lat: 28.641375, lng: 77.08708 },
    ];

    let marker = pointers.map((point, key) => {
      return <Marker key={key} position={point} />;
    });
    let circle = pointers.map((point, key) => {
      return (
        <Circle
          key={key}
          center={point}
          radius={60}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#c00"
          fillOpacity={0.5}
        />
      );
    });

    const coords = pos || currentPos;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={center}
        center={coords}
        mapTypeControl={false}
        streetViewControl={false}
      >
        {/* <Marker position={currentPos} /> */}
        <Circle
          radius={1200}
          center={coords}
          onMouseover={() => {}}
          onClick={() => {}}
          onMouseout={() => {}}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#000088"
          fillOpacity={0.2}
        />
        {marker}
        {circle}
      </Map>
    );
  }
}

const LoadingContainer = (props) => <PageLoader />;

export default GoogleApiWrapper({
  apiKey: process.env.googleAPIKey,
  LoadingContainer: LoadingContainer,
})(MapContainer);
