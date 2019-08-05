import React from "react";
import "./Home.css";

const layout = function(props) {
  const {hero} = props;

  return (
  <div className="hero">
      <div className="container">
        <div className="row">
      
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">

          <h2>{hero.Title}</h2>
          <div dangerouslySetInnerHTML={{ __html: hero.Description }} />
            <a className="btn btn-outline-primary btn-lg mt-5" href={hero['Url Link']}>Leer más</a>
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
