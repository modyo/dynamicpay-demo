import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Client, Conditions } from "./sdk";
import "./Home.css";
import Hero from "./Hero";
import Brands from "./Brands";

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
    // https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries
    // CORS problems
    const homeClient = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "fintech"
    });
    homeClient
      .getEntries("card")
      .then(response => response)
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index];
          items.push(item);
        }
        this.setState({ blocks: items, isLoading: false });
      });
    const heroClient = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "fintech"
    });
    heroClient
      .getEntries("hero", "meta.tag=hero-home")
      .then(response => response)
      .then(data => {
        // console.log("HERO data: ", data.entries[0].fields);
        // for (let index = 0; index < data.entries.length; index++) {
        //   const item = data.entries[index].fields;
        //   items.push(item);
        // }
        this.setState({ hero: data.entries[0].fields, isLoadingHero: false });
      });
  }
  render() {
    const { blocks, hero, isLoadingHero, isLoading } = this.state;
    // console.log("blocks: ", blocks);
    // console.log("isLoading: ", isLoading);
    return (
      <Fragment>
        <Hero hero={hero} isLoadingHero={isLoadingHero} />
        <div className="section py-5">
          <div className="container">
            <div className="d-flex carousel-home">
              {blocks.map((item, i) =>
                item.meta.tags[0] === "carousel-home" ? (
                  <div className="card flex-1 mx-3" key={i}>
                    <div className="card-header">
                      <img
                        src={item.fields.cover.url}
                        alt={item.fields.cover.title}
                      />
                    </div>
                    <h5>
                      <Link className="nav-link" to={`${item.fields.url}`}>
                        {item.fields.title}
                      </Link>
                    </h5>
                    <div
                      className="p-3"
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
                className="container bg-banner2 p-5"
                style={{ backgroundImage: `url(${item.fields.cover.url}` }}
                key={i}
              >
                <div className="row no-gutters">
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <div className="bg-white p-5">
                      <h2>{item.fields.title}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.fields.description
                        }}
                      />
                      <Link
                        className="btn btn-primary mt-4"
                        to={`${item.fields.url}`}
                      >
                        {item.fields.title}
                      </Link>
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
