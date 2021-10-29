import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ChatIcon from "@mui/icons-material/Chat";
import css from "./Navbar.module.css";

const Navbar = () => {
  const enoughWidth = useMediaQuery("(min-width:320px)");

  return (
    <>
      {enoughWidth && (
        <div className={css.stickyHeader}>
          <Box sx={{ flexGrow: 1, marginX: 2 }}>
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
                    <div className={css.underlineLink}>Publications</div>
                  </Item>
                  <Item>
                    <div className={css.underlineLink}>Projects</div>
                  </Item>
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
                    <ChatIcon />
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
