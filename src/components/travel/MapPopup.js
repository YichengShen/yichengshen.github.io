import { Popup } from "react-map-gl";
import Box from "@mui/material/Box";

const MapPopup = ({ d, closePopup }) => {
  return (
    <Popup
      longitude={d.lng}
      latitude={d.lat}
      offset={{
        "bottom-left": [12, -38],
        bottom: [0, -38],
        "bottom-right": [-12, -38],
      }}
      style={{ padding: "0px" }}
      onClose={() => closePopup()}
      closeButton={true}
      closeOnClick={false}
      closeOnMove={true}
      focusAfterOpen={false}
      anchor="bottom"
    >
      {d.city}, {d.country}
      <small>
        <PopupDate data={d} />
      </small>
    </Popup>
  );
};

const PopupDate = (props) => {
  const d = props.data;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = d.year;
  const month = months[d.month - 1];

  return (
    <Box>
      <em>
        {month && month} {year}
      </em>
    </Box>
  );
};

export default MapPopup;
