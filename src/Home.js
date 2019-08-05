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
          const item = data.entries[index].fields;
          items.push(item);
        }
        this.setState({ blocks: items, isLoading: false });
      });
    const heroClient = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "fintech"
    });
    heroClient
      .getEntries("hero")
      .then(response => response)
      .then(data => {
        console.log("HERO data: ", data.entries[0].fields);
        // for (let index = 0; index < data.entries.length; index++) {
        //   const item = data.entries[index].fields;
        //   items.push(item);
        // }
        this.setState({ hero: data.entries[0].fields, isLoadingHero: false });
      });
  }
  render() {
    const { blocks, hero, isLoadingHero, isLoading } = this.state;
    console.log("blocks: ", blocks);
    console.log("isLoading: ", isLoading);
    return (
      <Fragment>
        <Hero hero={hero} isLoadingHero={isLoadingHero} />
        <div className="section py-5">
          <div className="container">
            {blocks.map((item, i) => (
              <li className="nav-item" key={i}>
                <Link className="nav-link" to={`${item.url}`}>
                  {item.title}
                </Link>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                <img src={item.cover.url} alt={item.cover.title} />
              </li>
            ))}
          </div>
        </div>
        <Brands />
      </Fragment>
    );
  }
}

export default Home;
