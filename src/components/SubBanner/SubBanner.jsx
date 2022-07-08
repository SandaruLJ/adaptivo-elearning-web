import React from "react";
import "./SubBanner.css";

const SubBanner = (props) => {
  return (
    <div className="sub-banner">
      <div className="banner-icon">
        <img src={props.image} />
      </div>
      <div className="banner-title">{props.title}</div>
      <div className="banner-description">{props.description}</div>
    </div>
  );
};

export default SubBanner;
