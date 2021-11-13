import { React, useEffect, useState } from "react";
import { readString } from "react-papaparse";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Publications from "./Publications";

const App = () => {
  const [AboutData, setAboutData] = useState(null);
  const [PublicationsData, setPublicationsData] = useState(null);

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
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      {AboutData && <About about={AboutData} />}
      {PublicationsData && <Publications publications={PublicationsData} />}
    </>
  );
};

export default App;