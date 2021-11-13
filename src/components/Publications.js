import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import css from "./Publications.module.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VideocamIcon from "@mui/icons-material/Videocam";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import StorageIcon from "@mui/icons-material/Storage";
import WebIcon from "@mui/icons-material/Web";

import MyLink from "./MyLink";

const Publications = (props) => {
  const { publications } = props;
  const data = publications;

  return (
    <Box
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
          <h1 id="about">Publications</h1>
        </Box>
        {data.map((d) => (
          <Grid container spacing={3} key={d.title} sx={{ marginBottom: 4 }}>
            <Grid item xs={12} sm>
              <PubImage data={d} />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <PubContent data={d} />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

const PubImage = (props) => {
  const type = props.data.type.toLowerCase(); // type is used as name of subfolder
  const title = props.data.title;
  const titleStrip = title.toLowerCase().trim();
  const titleNoSymbol = titleStrip.replace(/[^\w\s]/gi, "");
  const titleClean = titleNoSymbol.replace(/\s/g, "-");
  const imagePath = `${process.env.PUBLIC_URL}/files/publications/${type}/${titleClean}/image.png`;

  console.log(imagePath);

  return (
    <div>
      <div
        className={css.pubImage}
        style={{ backgroundImage: `url(${imagePath})` }}
      />
    </div>
  );
};

const PubContent = (props) => {
  const d = props.data;

  return (
    <div>
      <div>
        <strong>{d.title}</strong>
      </div>
      <Box sx={{ marginBottom: 0.8 }} />
      <BoldedText text={d.authors} shouldBeBold={"Yicheng Shen"} />
      <Box sx={{ marginBottom: 0.5 }} />
      <div>
        <em>
          {d.venue}
          {d.venue_abbreviation ? (
            <span>
              {" "}
              (<b>{d.venue_abbreviation}</b>)
            </span>
          ) : (
            ""
          )}
          , {d.year}
        </em>
      </div>
      <div>
        <strong>{d.award ? d.award : ""}</strong>
      </div>
      <div>
        <PubMaterials data={d} />
      </div>
    </div>
  );
};

const BoldedText = ({ text, shouldBeBold }) => {
  const textArray = text.split(shouldBeBold);
  return (
    <span>
      {textArray.map((item, index) => (
        <span key={index}>
          {item}
          {index !== textArray.length - 1 && <b>{shouldBeBold}</b>}
        </span>
      ))}
    </span>
  );
};

const PubMaterials = (props) => {
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
      {d.paper_link && (
        <LinkItem>
          <MyLink
            link={d.paper_link}
            text={
              <div>
                <MenuBookIcon fontSize="small" sx={{ verticalAlign: "sub" }} />{" "}
                Paper
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

      {d.media && (
        <LinkItem>
          <MyLink
            link={d.media}
            text={
              <div>
                <WebIcon fontSize="small" sx={{ verticalAlign: "sub" }} /> Media
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

export default Publications;
