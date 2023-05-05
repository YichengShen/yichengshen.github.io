import { Marker } from "react-map-gl";

const MapMarker = ({ popupId, d, openPopup }) => {
  return (
    <Marker
      longitude={d.lng}
      latitude={d.lat}
      anchor="bottom"
      onClick={() => openPopup(popupId)}
    >
      <img
        src={process.env.PUBLIC_URL + "/maki_icons/marker.svg"}
        alt="marker"
      />
    </Marker>
  );
};

export default MapMarker;
