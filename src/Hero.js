import React from "react";
import "./Hero.css";
import Loading from "./Loading";
import { withNamespaces } from 'react-i18next';

const layout = function(props) {
  const { hero } = props;
  // console.log("hero: ", hero);
  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <div>
                  <h2>{hero.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: hero.description }} />
                  <a
                    className="btn btn-outline-primary btn-lg mt-5"
                    href={hero["url link"]}
                  >
                    {hero["link title"]}
                  </a>
                </div>
              </div>
              <div className="col-md-6 mt-4 mt-lg-0">
                <img src={hero.cover.url} alt={hero.cover.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Hero(props) {
  // console.log("props: ", props);
  const { hero } = props;

  const { t } = props;
  const loading = t('global-loading');

  return hero ? layout(props) : <Loading title={loading} />;
}

export default withNamespaces()(Hero);
