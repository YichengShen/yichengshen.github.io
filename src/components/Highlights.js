import { React, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey, deepPurple } from "@mui/material/colors";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import ShowMoreButton from "../common/ShowMoreButton";
import { LanguageContext } from "../common/LanguageContext";

const Highlights = (props) => {
  const { web, highlights } = props;
  const W = web[0];

  const processData = (highlights) => {
    var dataProcessed = highlights;

    // Convert dates from string to int
    // Fill in blank days with 0
    for (var i in dataProcessed) {
      dataProcessed[i].year = parseInt(dataProcessed[i].year);
      dataProcessed[i].month = parseInt(dataProcessed[i].month);
      if (!dataProcessed[i].day) {
        dataProcessed[i].day = 0;
      } else {
        dataProcessed[i].day = parseInt(dataProcessed[i].day);
      }
    }

    // Sort based on dates
    dataProcessed = dataProcessed.sort((a, b) =>
      parseInt(a.year) > parseInt(b.year)
        ? -1
        : parseInt(a.year) === parseInt(b.year)
        ? parseInt(a.month) > parseInt(b.month)
          ? -1
          : parseInt(a.month) === parseInt(b.month)
          ? parseInt(a.day) > parseInt(b.day)
            ? -1
            : 1
          : 1
        : 1
    );

    return dataProcessed;
  };

  const data = processData(highlights);

  let filteredData = data;

  let numData = data.length;
  const [MaxNumHighlights, SetMaxNumHighlights] = useState(5);
  const [FilterCond, SetFilterCond] = useState("all");

  switch (FilterCond) {
    case "all":
      filteredData = data;
      numData = filteredData.length;
      break;
    case "life":
      filteredData = data.filter((item) => item.type.toLowerCase() === "life");
      numData = filteredData.length;
      break;
    case "work":
      filteredData = data.filter((item) => item.type.toLowerCase() === "work");
      numData = filteredData.length;
      break;
    case "achievements":
      filteredData = data.filter(
        (item) => item.type.toLowerCase() === "achievement"
      );
      numData = filteredData.length;
      break;
    default:
      filteredData = data;
      numData = filteredData.length;
  }

  const handleShowMore = () => {
    SetMaxNumHighlights(MaxNumHighlights + 5);
  };

  const handleFilterChange = (event) => {
    SetFilterCond(event.target.value);
    SetMaxNumHighlights(5);
    console.log(numData);
  };

  return (
    <Box
      id="highlights"
      sx={{
        bgcolor: grey[200],
        width: "80vw",
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
          <h1>{W.section_name_highlights}</h1>

          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="filter"
              name="row-radio-buttons-group"
              value={FilterCond}
              onChange={handleFilterChange}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label={W.highlights_radio_label_all}
              />
              <FormControlLabel
                value="achievements"
                control={<Radio />}
                label={W.highlights_radio_label_achievements}
              />
              <FormControlLabel
                value="work"
                control={<Radio />}
                label={W.highlights_radio_label_work}
              />
              <FormControlLabel
                value="life"
                control={<Radio />}
                label={W.highlights_radio_label_life}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: grey[50],
                padding: 2,
                borderRadius: "25px",
                overflow: "hidden",
              }}
            >
              <Timeline>
                {filteredData
                  .slice(0, -1)
                  .slice(0, MaxNumHighlights)
                  .map((d, index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent sx={{ flex: 0.15 }}>
                        <HighlightsDate data={d} />
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot variant="outlined" color="primary" />
                        <TimelineConnector sx={{ bgcolor: "primary.main" }} />
                      </TimelineSeparator>
                      <TimelineContent>
                        <small>{d.description}</small>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                {numData <= MaxNumHighlights && (
                  <TimelineItem>
                    <TimelineOppositeContent sx={{ flex: 0.15 }}>
                      <HighlightsDate data={filteredData.slice(-1)[0]} />
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color="primary" />
                    </TimelineSeparator>
                    <TimelineContent>
                      <small>{filteredData.slice(-1)[0].description}</small>
                    </TimelineContent>
                  </TimelineItem>
                )}
              </Timeline>
              {numData > MaxNumHighlights && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <ShowMoreButton w={W} showMore={handleShowMore} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const HighlightsDate = (props) => {
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
  const day = d.day;

  return (
    <Box sx={{ color: deepPurple[400] }}>
      <em>
        {day !== 0 && day} {month && month} {year}
      </em>
    </Box>
  );
};

export default Highlights;
