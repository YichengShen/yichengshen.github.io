import { React, useEffect, useState } from "react";
import { readString } from "react-papaparse";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Publications from "./Publications";
import Projects from "./Projects";

const App = () => {
  const [AboutData, setAboutData] = useState(null);
  const [PublicationsData, setPublicationsData] = useState(null);
  const [ProjectsData, setProjectsData] = useState(null);

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
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      {AboutData && <About about={AboutData} />}
      {PublicationsData && <Publications publications={PublicationsData} />}
      {ProjectsData && <Projects projects={ProjectsData} />}
      <footer style={{ textAlign: "center" }}>
        Copyright &copy; {year} Yicheng Shen.
      </footer>
    </>
  );
};

export default App;
