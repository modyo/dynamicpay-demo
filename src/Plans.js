import React, {Component, Fragment} from 'react'
import HeroPlans from './HeroPlans'
import { Client, Conditions } from "./sdk";
import Loading from "./Loading"

export default class Plans extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hero: null,
      plans: null
    }
  }

  componentDidMount() {
    const client = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "fintech"
    });
    client
      .getEntries("hero", "meta.tag=hero-plans")
      .then(response => response)
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index].fields;
          items.push(item);
        }
        const sortedItems = items.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );
        // console.log("sortedItems: ", sortedItems);
        this.setState({ hero: sortedItems, isLoading: false });
      });
  }

  render() {
    return (
        <Fragment>
        <div className="plans-layout">  
            {this.state.hero ? <HeroPlans hero={this.state.hero[0]} /> : <Loading title="Cargando..." />}
        </div>
        <div className="plans-list">
            {this.state.plans ? <HeroPlans hero={this.state.hero[0]} /> : <Loading title="Cargando..." />}
        </div>
      </Fragment>
    )
  }
}