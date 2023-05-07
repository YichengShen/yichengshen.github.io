import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ProcessTravelData from "./ProcessTravelData";
import MapMarker from "./MapMarker";
import MapPopup from "./MapPopup";
import CustomAccordions from "./CustomAccordions";

// API Token from Mapbox
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

const Travel = (props) => {
  const { web, travel } = props;
  const W = web[0];

  let [data, dataDisplayed] = ProcessTravelData(travel);
  let filteredData = data;

  const mapRef = useRef(null);

  const [ViewState, SetViewState] = useState({
    longitude: -71.0596,
    latitude: 42.3605,
    zoom: 2,
  });

  // Popup when a marker is clicked
  const [ActivePopupId, SetActivePopupId] = useState(null);
  const handleOpenPopup = (popupId) => {
    SetActivePopupId(popupId);
  };
  const handleClosePopup = () => {
    SetActivePopupId(null);
  };

  // Filters above map
  const [FilterCond, SetFilterCond] = useState("all");

  switch (FilterCond) {
    case "all":
      filteredData = data;
      break;
    case "memorable":
      filteredData = data.filter((d) => d.memorable);
      break;
    case "familiar":
      filteredData = data.filter((d) => d.familiar);
      break;

    default:
      filteredData = data;
  }

  const handleFilterChange = (event) => {
    SetFilterCond(event.target.value);
    SetActivePopupId(null);
    if (mapRef.current) {
      mapRef.current.getMap().flyTo({
        center: [ViewState.longitude, ViewState.latitude],
        zoom: 2,
        duration: 2000,
      });
    }
  };

  // Move camera when a city-name-link is clicked
  const handleCityClick = (d) => {
    if (mapRef.current) {
      mapRef.current.getMap().flyTo({
        center: [d.lng, d.lat],
        zoom: 10,
        duration: 5000,
      });
    }
    SetFilterCond("all");
  };

  return (
    <Box
      id="travel"
      sx={{
        bgcolor: grey[200],
        width: "75vw",
        padding: "2.5vw",
        marginX: "10vw",
        marginTop: 5,
        borderRadius: "25px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Box
          sx={{
            marginLeft: 2,
          }}
        >
          <h1>{W.section_name_travel}</h1>

          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="marker-filter"
              name="travel-row-radio-buttons-group"
              value={FilterCond}
              onChange={handleFilterChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="memorable"
                control={<Radio />}
                label="Memorable"
              />
              <FormControlLabel
                value="familiar"
                control={<Radio />}
                label="Familiar"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                bgcolor: grey[50],
                padding: 2,
                borderRadius: "25px",
                overflow: "hidden",
                height: "366px",
              }}
            >
              <ReactMapGL
                {...ViewState}
                ref={mapRef}
                mapboxAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                width="100%"
                height="366px"
                onMove={(evt) => {
                  SetViewState(evt.viewState);
                }}
              >
                {filteredData.map((d, index) => {
                  return ViewState.zoom > 4 || d.show ? (
                    <React.Fragment key={`fragment-${index}`}>
                      <MapMarker
                        key={`marker-${index}`}
                        popupId={index}
                        d={d}
                        openPopup={handleOpenPopup}
                      />
                      {ActivePopupId === index && (
                        <MapPopup
                          key={`popup-${index}`}
                          popupId={index}
                          d={d}
                          closePopup={handleClosePopup}
                        />
                      )}
                    </React.Fragment>
                  ) : null;
                })}
                <div style={{ position: "absolute", right: 10, top: 10 }}>
                  <NavigationControl />
                </div>
              </ReactMapGL>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: grey[50],
                padding: 2,
                borderRadius: "25px",
                overflow: "hidden",
              }}
            >
              <CustomAccordions
                data={dataDisplayed}
                cityClick={handleCityClick}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Travel;
