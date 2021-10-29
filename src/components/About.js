import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import css from "./About.module.css";


const About = () => {
    const NUMPHOTOS = 3
    const [TimeStamp, setTimeStamp] = useState(0)
    const [PhotoIdx, setPhotoIdx] = useState(0)

    function handleMouseMove(event) {  
        if ((event.timeStamp - TimeStamp) > 1000) {
            setTimeStamp(event.timeStamp);
            setPhotoIdx(Math.floor(Math.random() * NUMPHOTOS));
        };
    }

  return (
    <Box 
        sx={{
            bgcolor: grey[100],
            width: '75vw',
            padding: '2.5vw',
            marginX: '10vw',
            marginTop: 5,
            borderRadius: '25px',
            overflow: 'hidden',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
        }} 
    >
        <Box sx={{textAlign: 'center'}}>
            <Box sx={{
                    textAlign: 'left',
                    marginLeft: 2
                }}
            >
                <h1 id="about">About</h1>
            </Box>
            <Grid container>
                <Grid item xs={12} sm>
                <div className={css.aspectRatio}>
                    <img
                    className={css.profileImage}
                    src={process.env.PUBLIC_URL + "/images/profile/photo" + PhotoIdx + ".jpg"}
                    alt="me"
                    onMouseMove={(event)=> handleMouseMove(event)}
                    />
                </div>
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                <div className={css.text}>
                    Hi, I'm Yicheng.
                    <br /><br />
                    I graduated from Boston College in 2021 with a BA degree in Computer Science. 
                    I work as a CS research assistant. I'm interested in distributed systems, machine learning, edge computing, and vehicular clouds.
                    <br /><br />
                    I am currently applying for a master program.
                </div>
                </Grid>
            </Grid>
      </Box>
    </Box>
  );
};

export default About;
