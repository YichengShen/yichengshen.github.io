import { createTheme } from "@mui/material/styles";

const getTheme = (language) => {
  let fontBody = [
    "Georgia",
    "GeorgiaBold",
    "GeorgiaItalic",
    "GeorgiaBoldItalic",
    "PlayfairDisplay",
    "PlayfairDisplayItalic",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(",");
  let fontMyName = ["PlayfairDisplay"];
  let letterSpacingMyName = 1;
  let fontTitlesH1 = ["PlayfairDisplay", "PlayfairDisplayItalic"].join(",");
  let fontTitlesH2 = ["PlayfairDisplay", "PlayfairDisplayItalic"].join(",");

  if (language === "zh") {
    fontBody = ["NotoSerifSCMedium"].join(",");
    fontMyName = ["LongCangRegular"].join(",");
    letterSpacingMyName = 30;
    fontTitlesH1 = ["NotoSerifSCBlack"].join(",");
    fontTitlesH2 = ["NotoSerifSCSemiBold"].join(",");
  }

  return createTheme({
    fontMyName,
    letterSpacingMyName,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: "rgb(0, 18, 66)",
            lineHeight: 1.3,
            margin: 0,
            fontFamily: fontBody,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          h1: { fontFamily: fontTitlesH1, fontWeight: 800 },
          h2: { fontFamily: fontTitlesH2, fontWeight: 800 },
        },
      },
    },
    typography: {
      fontFamily: [
        "Georgia",
        "GeorgiaBold",
        "GeorgiaItalic",
        "GeorgiaBoldItalic",
        "PlayfairDisplay",
        "PlayfairDisplayItalic",
        "NotoSerifSCMedium",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
};

export default getTheme;
