import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import css from "./Projects.module.css";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VideocamIcon from "@mui/icons-material/Videocam";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import StorageIcon from "@mui/icons-material/Storage";

import MyLink from "./MyLink";

const Projects = (props) => {
  const { projects } = props;
  const data = projects;

  return (
    <Box
      id="projects"
      sx={{
        bgcolor: grey[100],
        width: "75vw",
        padding: "2.5vw",
        marginX: "10vw",
        marginTop: 5,
        borderRadius: "25px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Box
          sx={{
            marginLeft: 2,
          }}
        >
          <h1>Projects</h1>
        </Box>
        <Grid container spacing={4}>
          {data.map((d) => (
            <Grid item xs={12} md={6} xl={4} key={d.title}>
              <Box
                sx={{
                  bgcolor: grey[300],
                  padding: 2,
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              >
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  <Grid item xs={12}>
                    <ProjectImage data={d} />
                  </Grid>
                  <Grid item xs={12}>
                    <ProjectContent data={d} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const ProjectImage = (props) => {
  const year = props.data.year; // year is used as name of subfolder
  const title = props.data.title;
  const titleStrip = title.toLowerCase().trim();
  const titleNoSymbol = titleStrip.replace(/[^\w\s]/gi, "");
  const titleClean = titleNoSymbol.replace(/\s/g, "-");
  const imagePath = `${process.env.PUBLIC_URL}/files/projects/${year}/${titleClean}/image.png`;

  //   console.log(imagePath);

  return (
    <div
      className={css.projectImage}
      style={{ backgroundImage: `url(${imagePath})` }}
    />
  );
};

const ProjectContent = (props) => {
  const d = props.data;

  return (
    <div>
      <Box sx={{ fontSize: "Large" }}>
        <strong>{d.title}</strong>
      </Box>
      <Box sx={{ marginBottom: 0.8 }} />

      <div>{d.description}</div>

      <div>
        <ProjectMaterials data={d} />
      </div>
    </div>
  );
};

const ProjectMaterials = (props) => {
  const d = props.data;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        fontSize: "small",
        marginTop: "1vh",
      }}
    >
      {d.website && (
        <LinkItem>
          <MyLink
            link={d.website}
            text={
              <div>
                <LanguageIcon fontSize="small" sx={{ verticalAlign: "sub" }} />{" "}
                Website
              </div>
            }
          />
        </LinkItem>
      )}

      {d.slides && (
        <LinkItem>
          <MyLink
            link={d.slides}
            text={
              <div>
                <SlideshowIcon fontSize="small" sx={{ verticalAlign: "sub" }} />{" "}
                Slides
              </div>
            }
          />
        </LinkItem>
      )}

      {d.video && (
        <LinkItem>
          <MyLink
            link={d.video}
            text={
              <div>
                <VideocamIcon fontSize="small" sx={{ verticalAlign: "sub" }} />{" "}
                Video
              </div>
            }
          />
        </LinkItem>
      )}

      {d.code && (
        <LinkItem>
          <MyLink
            link={d.code}
            text={
              <div>
                <CodeIcon fontSize="small" sx={{ verticalAlign: "sub" }} /> Code
              </div>
            }
          />
        </LinkItem>
      )}

      {d.data && (
        <LinkItem>
          <MyLink
            link={d.data}
            text={
              <div>
                <StorageIcon fontSize="small" sx={{ verticalAlign: "sub" }} />{" "}
                Data
              </div>
            }
          />
        </LinkItem>
      )}
    </Box>
  );
};

const LinkItem = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: "black",
        marginRight: 1.5,
        textAlign: "center",
        ...sx,
      }}
      {...other}
    />
  );
};

export default Projects;
