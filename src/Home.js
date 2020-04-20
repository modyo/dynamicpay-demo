import React, { Fragment } from "react";
import "./Home.css";
import Hero from "./Hero";
import Brands from "./Brands";
import getEntries from "./modyoBankyoEntries";
import i18n from "./i18n";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      hero: null,
      isLoadingHero: false,
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoadingHero: true, isLoading: true });
    // TODO: continuar con cuando el idioma cambia
    getEntries("getdynamicpay-content", "card", i18n.language)
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index];
          items.push(item);
        }
        this.setState({ blocks: items, isLoading: false });
      });

    getEntries("getdynamicpay-content", "hero", i18n.language)
      .then(data => {
        this.setState({ hero: data.entries[0].fields, isLoadingHero: false });
      });
  }
  render() {
    const { blocks, hero, isLoadingHero } = this.state;
    // console.log("hero: ", hero);
    // console.log("isLoading: ", isLoading);
    return (
      <Fragment>
        <Hero hero={hero} isLoadingHero={isLoadingHero} />
        <div className="section py-5">
          <div className="container">
            <div className="d-lg-flex carousel-home">
              {blocks.map((item, i) =>
                item.meta.tags[0] === "carousel-home" ? (
                  <div className="card flex-1 mx-3 mb-3 mb-lg-0" key={i}>
                    <div className="card-header">
                      <img
                        src={item.fields.cover.url}
                        alt={item.fields.cover.title}
                      />
                    </div>
                    <h5>
                      <a href={item.fields.url} className="nav-link">
                        {item.fields.title}
                      </a>
                    </h5>
                    <div
                      className="p-3 d-none d-lg-block"
                      dangerouslySetInnerHTML={{
                        __html: item.fields.description
                      }}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>

        <div className="section py-5 bg-white">
          {blocks.map((item, i) =>
            item.meta.tags[0] === "banner2" ? (
              <div
                className="container bg-banner2 p-3 p-lg-5"
                style={{ backgroundImage: `url(${item.fields.cover.url}` }}
                key={i}
              >
                <div className="row no-gutters">
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <div className="bg-white p-3 p-lg-5">
                      <h2>{item.fields.title}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.fields.description
                        }}
                      />
                      <a
                        className="btn btn-primary mt-4"
                        href={item.fields.url}
                      >
                        {item.fields.title}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>

        <Brands />
      </Fragment>
    );
  }
}

export default Home;
