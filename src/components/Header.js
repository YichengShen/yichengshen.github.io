import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Divider, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import css from "./Header.module.css";

const Header = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x7bc7ff,
          midtoneColor: 0xfea3cb,
          lowlightColor: 0xb7a8ff,
          baseColor: 0xffffff,
          blurFactor: 0.4,
          speed: 0.95,
          zoom: 0.7,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <Box
      sx={{
        bgcolor: "#35baf6",
        width: "80vw",
        height: "80vh",
        marginX: "10vw",
        marginTop: 2.5,
        borderRadius: "25px",
        WebkitBorderRadius: "25px",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={myRef}
    >
      <Box sx={{ textAlign: "center" }}>
        <h1 className={css.nameHeading}>Yicheng Shen</h1>
        <Divider flexItem></Divider>
        <br />

        {/* Screens larger than sm */}
        {smUp && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link href="mailto:yichengshen1016@gmail.com">
                  <IconButton>
                    <MailOutlineIcon sx={{ fontSize: "3.5vw" }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="https://github.com/YichengShen">
                  <IconButton>
                    <GitHubIcon sx={{ fontSize: "3.5vw" }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="https://www.linkedin.com/in/yichengshen/">
                  <IconButton>
                    <LinkedInIcon sx={{ fontSize: "3.5vw" }} />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Screens smaller than sm */}
        {smDown && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link href="mailto:yichengshen1016@gmail.com">
                  <IconButton>
                    <MailOutlineIcon sx={{ fontSize: "7vw" }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="https://github.com/YichengShen">
                  <IconButton>
                    <GitHubIcon sx={{ fontSize: "7vw" }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="https://www.linkedin.com/in/yichengshen/">
                  <IconButton>
                    <LinkedInIcon sx={{ fontSize: "7vw" }} />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
