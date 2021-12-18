import { React, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { readString } from "react-papaparse";
import theme from "./theme";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Publications from "./Publications";
import Projects from "./Projects";
import Highlights from "./Highlights";
import Travel from "./Travel";

const App = () => {
  const [AboutData, setAboutData] = useState(null);
  const [PublicationsData, setPublicationsData] = useState(null);
  const [ProjectsData, setProjectsData] = useState(null);
  const [HighlightsData, setHighlightsData] = useState(null);
  const [TravelData, setTravelData] = useState(null);

  const d = new Date();
  const year = d.getFullYear();

  useEffect(() => {
    const getData = async (path, setData) => {
      const response = await fetch(path);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv string
      const results = readString(csv, { header: true }); // Use react-papaparse to get the object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log("Data loaded from " + path + ": ");
      console.log(rows);
      setData(rows);
    };
    getData(`${process.env.PUBLIC_URL}/files/about.csv`, setAboutData);
    getData(
      `${process.env.PUBLIC_URL}/files/publications.csv`,
      setPublicationsData
    );
    getData(`${process.env.PUBLIC_URL}/files/projects.csv`, setProjectsData);
    getData(
      `${process.env.PUBLIC_URL}/files/highlights.csv`,
      setHighlightsData
    );
    getData(`${process.env.PUBLIC_URL}/files/travel.csv`, setTravelData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <Header />
        {AboutData && <About about={AboutData} />}
        {PublicationsData && <Publications publications={PublicationsData} />}
        {ProjectsData && <Projects projects={ProjectsData} />}
        {HighlightsData && <Highlights highlights={HighlightsData} />}
        {TravelData && <Travel travel={TravelData} />}
        <footer style={{ textAlign: "center", marginTop: "2vh" }}>
          Copyright &copy; {year} Yicheng Shen.
        </footer>
      </>
    </ThemeProvider>
  );
};

export default App;
