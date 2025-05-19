import React from "react";
import PropTypes from "prop-types";
import "../style/cardsSobreNos.css"; 

export  function CardSobreNosotros({ imageSource, title, text, url }) {
  return (
    <div className="card-sobre-nosotros">
      <img src={imageSource} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <a
        href={url ? url : "#!"}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        Ver GitHub
      </a>
    </div>
  );
}

CardSobreNosotros.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};



