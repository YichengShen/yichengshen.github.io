import Link from "@mui/material/Link";
import css from "./MyLink.module.css";

const MyLink = (props) => {
  const { link, text } = props;
  return (
    <div className={css.myLink}>
      <Link
        href={link}
        target="_blank"
        rel="noopener"
        underline="none"
        color="inherit"
      >
        {text}
      </Link>
    </div>
  );
};

export default MyLink;
