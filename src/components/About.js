import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import css from "./About.module.css";

const About = (props) => {
  const { web, about } = props;
  const W = web[0];
  const info = about[0];

  const [TimeStamp, setTimeStamp] = useState(0);
  const [PhotoIdx, setPhotoIdx] = useState(0);

  const handleMouseMove = (event) => {
    if (event.timeStamp - TimeStamp > 1000) {
      setPhotoIdx(Math.floor(Math.random() * info.num_photos));
      setTimeStamp(event.timeStamp);
    }
  };

  return (
    <Box
      id="about"
      sx={{
        bgcolor: grey[100],
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
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            textAlign: "left",
            width: "100%",
            marginLeft: 2,
          }}
        >
          <h1>{W.section_name_about}</h1>
        </Box>
        <Grid container>
          <Grid item xs={12} sm>
            <div className={css.aspectRatio}>
              <img
                className={css.profileImage}
                src={
                  process.env.PUBLIC_URL +
                  "/images/profile/photo" +
                  PhotoIdx +
                  ".jpg"
                }
                alt="me"
                onMouseMove={(event) => handleMouseMove(event)}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <AboutDescription info={info} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const AboutDescription = (props) => {
  return (
    <div className={css.text}>
      {Object.entries(props.info).map(([key, value]) => {
        if (key.includes("line")) {
          return (
            <div key={key}>
              {value}
              <br />
              <br />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default About;
