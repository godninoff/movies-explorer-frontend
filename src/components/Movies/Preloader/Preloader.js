import React from "react";
import "./Preloader.css";
import BeatLoader from "react-spinners/BeatLoader";

const Preloader = (props) => {
  return (
    <div className="preloader" preloader={props.preloader}>
      <div className="preloader__container">
        <BeatLoader height={15} color={"lime"} />
      </div>
    </div>
  );
};

export default Preloader;
