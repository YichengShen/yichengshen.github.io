import React from "react";
import { purple } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

import css from "./CustomAccordions.module.css";

const CustomAccordions = (props) => {
  const { w, data, cityClick } = props;

  const W = w;

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
            {W.travel_title_current_location}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {currentCity ? `${currentCity.city}, ${currentCity.country}` : "-"}
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
            {W.travel_title_number_visited}
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
            {W.travel_title_memorable_cities}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {W.travel_description_memorable}
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
            {W.travel_title_familiar_cities}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {W.travel_description_familiar}
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

export default CustomAccordions;
