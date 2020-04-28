import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8Qlh7nkwzPTUGvSoxMX7YlVfz-ckDRAs&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 28.6232186, lng: 77.1121557 }}
    defaultOptions={{ mapTypeControl: false }}
  >
    {props.isMarkerShown && [
      <Marker
        key={0}
        position={{ lat: 28.625306, lng: 77.113301 }}
        onClick={props.onMarkerClick}
      />,
      <Marker
        key={1}
        position={{ lat: 28.6262702, lng: 77.115835 }}
        onClick={props.onMarkerClick}
      />,
      <Marker
        key={2}
        position={{ lat: 28.626151, lng: 77.114634 }}
        onClick={props.onMarkerClick}
      />,
    ]}
  </GoogleMap>
));
