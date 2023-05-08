import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  "& .MuiButton-label": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiSvgIcon-root": {
    marginTop: theme.spacing(0.5),
  },
}));

const ShowMoreButton = (props) => {
  const W = props.w;
  const handleShowMore = props.showMore;

  return (
    <Stack spacing={0}>
      <CustomButton size="small" onClick={handleShowMore}>
        {W.button_show_more}
        <KeyboardDoubleArrowDownIcon sx={{ fontSize: 32, mt: 0, p: 0 }} />
      </CustomButton>
    </Stack>
  );
};

export default ShowMoreButton;
