import React, { useContext } from "react";
import { Popup } from "react-map-gl";
import Box from "@mui/material/Box";

import { LanguageContext } from "../../common/LanguageContext";

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

  const { language } = useContext(LanguageContext);

  const months_en = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const months_zh = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];

  let months = months_en;
  if (language === "zh") {
    months = months_zh;
  }

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
