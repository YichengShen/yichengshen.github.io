import { React, useEffect, useState } from "react";
import { readString } from "react-papaparse";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";

const App = () => {
  const [AboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getData = async (path) => {
      const response = await fetch(path);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv string
      const results = readString(csv, { header: true }); // Use react-papaparse to get the object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log("Data loaded from " + path + ": ");
      console.log(rows);
      setAboutData(rows);
    };
    getData(process.env.PUBLIC_URL + "/files/about.csv");
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      {AboutData && <About about={AboutData} />}
    </>
  );
};

export default App;
