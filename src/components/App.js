import { React, useEffect, useState, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { readString } from "react-papaparse";
import theme from "./theme";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Publications from "./Publications";
import Projects from "./Projects";
import Highlights from "./Highlights";
import Travel from "./travel/Travel.js";
import { LanguageContext } from "../common/LanguageContext";

const App = () => {
  const { language } = useContext(LanguageContext);
  const [WebData, setWebData] = useState(null);
  const [AboutData, setAboutData] = useState(null);
  const [PublicationsData, setPublicationsData] = useState(null);
  const [ProjectsData, setProjectsData] = useState(null);
  const [HighlightsData, setHighlightsData] = useState(null);
  const [TravelData, setTravelData] = useState(null);

  const d = new Date();
  const year = d.getFullYear();

  useEffect(() => {
    const getData = async (filename, setData) => {
      const basePath = `${process.env.PUBLIC_URL}/files/`;
      const filePath = `${basePath}${filename}_${language}.csv`;
      const fallbackFilePath = `${basePath}${filename}_en.csv`;

      let response = await fetch(filePath);

      if (!response.ok && language !== "en") {
        // If the file with the _zh suffix doesn't exist and the language is not English,
        // fallback to using the English file
        response = await fetch(fallbackFilePath);
      }

      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv string
      const results = readString(csv, { header: true }); // Use react-papaparse to get the object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log(
        "Data loaded from " + (response.url || fallbackFilePath) + ": "
      );
      console.log(rows);
      setData(rows);
    };

    getData("web", setWebData);
    getData("about", setAboutData);
    getData("publications", setPublicationsData);
    getData("projects", setProjectsData);
    getData("highlights", setHighlightsData);
    getData("travel", setTravelData);
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      {WebData && (
        <>
          <Navbar web={WebData} />
          {AboutData && <Header about={AboutData} />}
          {AboutData && <About web={WebData} about={AboutData} />}
          {ProjectsData && <Projects web={WebData} projects={ProjectsData} />}
          {PublicationsData && (
            <Publications web={WebData} publications={PublicationsData} />
          )}
          {HighlightsData && (
            <Highlights web={WebData} highlights={HighlightsData} />
          )}
          {TravelData && <Travel web={WebData} travel={TravelData} />}
          <footer style={{ textAlign: "center", marginTop: "2vh" }}>
            Copyright &copy; {year} Yicheng Shen.
          </footer>
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
