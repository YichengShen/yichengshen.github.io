import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey, purple } from "@mui/material/colors";
import css from "./Travel.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY,
});

const Travel = (props) => {
  const { travel } = props;

  const trip = {
    country: "",
    city: "",
    lng: 0,
    lat: 0,
    year: 2000,
    month: 1,
    purpose: "",
    memorable: false,
    familiar: false,
    current: false,
  };

  const processData = (trips) => {
    var dataProcessed = [];
    var cityArray = [];
    var currentCityObj = null;

    for (var i in trips) {
      const city = trips[i].city.toLowerCase();
      if (cityArray.includes(city)) {
        var previousTrip = dataProcessed.find(
          (d) => d.city.toLowerCase() === city
        );
        if (trips[i].memorable.toLowerCase() === "true") {
          previousTrip.memorable = true;
        }
        if (trips[i].familiar.toLowerCase() === "true") {
          previousTrip.familiar = true;
        }
      } else {
        cityArray.push(city);

        var newTrip = Object.create(trip);
        newTrip.country = trips[i].country;
        newTrip.city = trips[i].city;
        newTrip.lng = parseFloat(trips[i].lng);
        newTrip.lat = parseFloat(trips[i].lat);
        newTrip.year = parseInt(trips[i].year);
        newTrip.month = parseInt(trips[i].month);
        newTrip.purpose = trips[i].purpose;
        newTrip.memorable = trips[i].memorable.toLowerCase() === "true";
        newTrip.familiar = trips[i].familiar.toLowerCase() === "true";
        newTrip.current = trips[i].current.toLowerCase() === "true";

        if (newTrip.current) {
          currentCityObj = { city: newTrip.city, country: newTrip.country };
        }

        dataProcessed.push(newTrip);
      }
    }

    const dataDisplayed = {
      cities: cityArray,
      currentCity: currentCityObj,
      citiesMemorable: dataProcessed.filter((d) => d.memorable),
      citiesFamiliar: dataProcessed.filter((d) => d.familiar),
    };

    return [dataProcessed, dataDisplayed];
  };

  var [data, dataDisplayed] = processData(travel);

  let filteredData = data;

  // Initial map center is the coords of Boston
  const [Viewport, SetViewport] = useState({
    lng: -71.0596,
    lat: 42.3605,
    zoom: 1,
  });
  const [SelectedIndex, SetSelectedIndex] = useState(null);

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
    SetSelectedIndex(null);
    SetViewport({
      lng: Viewport.lng,
      lat: Viewport.lat,
      zoom: 1,
    });
  };

  const handleViewportChange = (event) => {
    const { lng, lat } = event.getCenter();
    const zoom = event.getZoom();
    SetViewport({
      lng: lng,
      lat: lat,
      zoom: zoom,
    });
    SetSelectedIndex(null);
  };

  const handleOpenPopup = (index) => {
    SetSelectedIndex(index);
  };

  const handleClosePopup = () => {
    SetSelectedIndex(null);
  };

  const handleCityClick = (d) => {
    SetViewport({
      lng: d.lng,
      lat: d.lat,
      zoom: 10,
    });
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
          <h1>Travel</h1>

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
              }}
            >
              <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                  height: "366px",
                }}
                center={[Viewport.lng, Viewport.lat]}
                zoom={[Viewport.zoom]}
                onMove={handleViewportChange}
              >
                {filteredData.map((d, index) => {
                  return (
                    <React.Fragment key={`marker-popup-${index}`}>
                      <CustomMarker
                        key={`marker-${index}`}
                        index={index}
                        d={d}
                        openPopup={handleOpenPopup}
                      />
                      {SelectedIndex !== null && (
                        <CustomPopup
                          key={`popup-${index}`}
                          index={SelectedIndex}
                          d={filteredData[SelectedIndex]}
                          closePopup={handleClosePopup}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </Map>
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
              <Accordions data={dataDisplayed} cityClick={handleCityClick} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const CustomMarker = ({ index, d, openPopup }) => {
  return (
    <Marker
      coordinates={[d.lng, d.lat]}
      anchor="bottom"
      onClick={() => openPopup(index)}
    >
      <img
        src={process.env.PUBLIC_URL + "/maki_icons/marker.svg"}
        alt="marker"
      />
    </Marker>
  );
};

const CustomPopup = ({ index, d, closePopup }) => {
  return (
    <Popup
      coordinates={[d.lng, d.lat]}
      offset={{
        "bottom-left": [12, -38],
        bottom: [0, -38],
        "bottom-right": [-12, -38],
      }}
      style={{ padding: "0px" }}
      onClick={closePopup}
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

const Accordions = (props) => {
  const { data, cityClick } = props;
  const currentCity = data.currentCity;
  const cities = data.cities;
  const citiesMemorable = data.citiesMemorable;
  const citiesFamiliar = data.citiesFamiliar;

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              fontFamily: "PlayfairDisplay",
              fontWeight: "bold",
              width: "100%",
              flexShrink: 0,
            }}
          >
            My Current Location
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {currentCity.city}, {currentCity.country}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{
              fontFamily: "PlayfairDisplay",
              fontWeight: "bold",
              width: "100%",
              flexShrink: 0,
            }}
          >
            Number of Cities Visited
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {cities.length}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{
              fontFamily: "PlayfairDisplay",
              fontWeight: "bold",
              width: "50%",
              flexShrink: 0,
            }}
          >
            Memorable Cities
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            These are places I want to revisit.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {citiesMemorable.map((d, index) => {
              return (
                <span
                  style={{
                    display: "inline-block",
                    paddingRight: "12px",
                    alignItems: "center",
                  }}
                  key={`memorable-city-${index}`}
                >
                  <RoomOutlinedIcon sx={{ color: purple[600] }} />
                  <button
                    onClick={() => cityClick(d)}
                    className={css.cityButton}
                  >
                    <span className={css.buttonText}>
                      {d.city}, {d.country}{" "}
                    </span>
                  </button>
                </span>
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            sx={{
              fontFamily: "PlayfairDisplay",
              fontWeight: "bold",
              width: "50%",
              flexShrink: 0,
            }}
          >
            Familiar Cities
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            These are places I stayed for more than a year.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {citiesFamiliar.map((d, index) => {
              return (
                <span
                  style={{
                    display: "inline-block",
                    paddingRight: "12px",
                    alignItems: "center",
                  }}
                  key={`familiar-city-${index}`}
                >
                  <RoomOutlinedIcon sx={{ color: purple[600] }} />
                  <button
                    onClick={() => cityClick(d)}
                    className={css.cityButton}
                  >
                    <span className={css.buttonText}>
                      {d.city}, {d.country}{" "}
                    </span>
                  </button>
                </span>
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Travel;
