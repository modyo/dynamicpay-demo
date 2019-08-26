import React, { Component } from "react";
import HeroInvite from "./HeroInvite";
import getClient from "./modyoClient";
import Loading from "./Loading";

export default class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null
    };
  }

  componentDidMount() {
    getClient("fintech")
      .getEntries("card", "meta.tag=hero-invite")
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
      <div className="invite-layout">
        {this.state.hero ? (
          <HeroInvite hero={this.state.hero[0]} />
        ) : (
          <Loading title="Cargando..." />
        )}
      </div>
    );
  }
}
