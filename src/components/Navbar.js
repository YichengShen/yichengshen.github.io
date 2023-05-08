import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import css from "./Navbar.module.css";
import TranslateIcon from "@mui/icons-material/Translate";
import React, { useContext } from "react";
import { LanguageContext } from "../common/LanguageContext";

const Navbar = (props) => {
  const { web } = props;
  const W = web[0];

  const enoughWidth = useMediaQuery("(min-width:320px)");
  const someMoreWidth = useMediaQuery("(min-width:468px)");

  const { language, switchLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en";
    switchLanguage(newLanguage);
  };

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
                        {W.section_name_about}
                      </Link>
                    </div>
                  </Item>
                  <Item>
                    <div className={css.underlineLink}>
                      <Link href="#projects" underline="none" color="inherit">
                        {W.section_name_projects}
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
                        {W.section_name_publications}
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
                            {W.section_name_highlights}
                          </Link>
                        </div>
                      </Item>
                      <Item>
                        <div className={css.underlineLink}>
                          <Link href="#travel" underline="none" color="inherit">
                            {W.section_name_travel}
                          </Link>
                        </div>
                      </Item>
                      <Item>
                        <div className={css.underlineLink}>
                          <Link
                            target="_blank"
                            href="https://www.yichengshen.com/a-cookbook"
                            underline="none"
                            color="inherit"
                          >
                            {W.section_name_misc}
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
                  <Item>
                    <Button
                      variant="outlined"
                      startIcon={<TranslateIcon />}
                      onClick={toggleLanguage}
                      sx={{
                        fontSize: 12,
                        py: 0,
                        px: 1,
                        mb: 0.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {language === "en" ? "中文网页" : "English"}
                    </Button>
                  </Item>
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
