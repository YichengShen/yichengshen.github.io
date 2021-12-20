import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ChatIcon from "@mui/icons-material/Chat";
import css from "./Navbar.module.css";
import React from "react";

const Navbar = () => {
  const enoughWidth = useMediaQuery("(min-width:320px)");
  const someMoreWidth = useMediaQuery("(min-width:468px)");

  return (
    <>
      {enoughWidth && (
        <div className={css.stickyHeader}>
          <Box sx={{ flexGrow: 1, marginX: 2, marginBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Item>
                    <div className={css.underlineLink}>
                      <Link href="#about" underline="none" color="inherit">
                        About
                      </Link>
                    </div>
                  </Item>
                  <Item>
                    <div className={css.underlineLink}>
                      <Link
                        href="#publications"
                        underline="none"
                        color="inherit"
                      >
                        Publications
                      </Link>
                    </div>
                  </Item>
                  <Item>
                    <div className={css.underlineLink}>
                      <Link href="#projects" underline="none" color="inherit">
                        Projects
                      </Link>
                    </div>
                  </Item>
                  {someMoreWidth && (
                    <React.Fragment>
                      <Item>
                        <div className={css.underlineLink}>
                          <Link
                            href="#highlights"
                            underline="none"
                            color="inherit"
                          >
                            Highlights
                          </Link>
                        </div>
                      </Item>
                      <Item>
                        <div className={css.underlineLink}>
                          <Link href="#travel" underline="none" color="inherit">
                            Travel
                          </Link>
                        </div>
                      </Item>
                    </React.Fragment>
                  )}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}
                >
                  <Item>{/* <ChatIcon /> */}</Item>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
};

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: "black",
        marginX: 1,
        textAlign: "center",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

export default Navbar;
