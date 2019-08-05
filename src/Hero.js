import React from "react";
import "./Hero.css";

const layout = function(props) {
  const {hero} = props;

  return (
  <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div>
            <h2>{hero.Title}</h2>
            <div dangerouslySetInnerHTML={{ __html: hero.Description }} />
              <a className="btn btn-outline-primary btn-lg mt-5" href={hero['Url Link']}>{hero['Link Title']}</a>
            </div>
            </div>
          <div className="col-md-6">
            <img src={hero.Cover.url} />
          </div>
          </div>
          </div>
        </div>
        
      </div>
      </div>
      )
}

function Hero(props) {
  console.log("props: ", props);
  const { hero, isLoadingHero } = props;
  
  return hero ? layout(props) : <div className="loading">Cargando...</div>
   
}

export default Hero;
