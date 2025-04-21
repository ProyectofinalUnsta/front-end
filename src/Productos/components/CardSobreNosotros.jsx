import React from "react";
import PropTypes from "prop-types";
import "../style/cardsSobreNos.css";


export function CardSobreNosotros({ imageSource, title, text, url }) {
  return (
<section>
<div className="text-center my-4">
      <div>
        <img src={imageSource} alt="Alumno" className="card-img-top imgNos"/>
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">{text ? text : text}</p>
        <b>
          <a
            href={url ? url : "#!"}
            target="_blank"
            className="btn btn-secondary border-0"
            rel="repositorpersonal"
          >
            <b>Github</b>
            <br />
            {title}
          </a>
        </b>
      </div>
    </div></section>
    );
}

CardSobreNosotros.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

