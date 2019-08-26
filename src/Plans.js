import React, { Component, Fragment } from "react";
import HeroPlans from "./HeroPlans";
import getClient from "./modyoClient";
import Loading from "./Loading";
import "./Plans.css";

export default class Plans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      plans: null
    };
  }

  componentDidMount() {
    getClient("fintech")
      .getEntries("hero", "meta.tag=hero-plans")
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index].fields;
          items.push(item);
        }
        this.setState({ hero: items, isLoading: false });
      });

    getClient("fintech")
      .getEntries("plans")
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index].fields;
          items.push(item);
        }
        const sortedItems = items.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );
        this.setState({ plans: sortedItems, isLoading: false });
      });
  }

  planItem() {
    return this.state.plans.map(e => {
      return (
        <div className="plan-item bg-white flex-1 mx-lg-4 mb-4 mb-lg-0">
          <div className="pricing-name">
            <h4 className="text-normal mb-0">{e.Title}</h4>
          </div>
          <div className="pricing-price">
            {e.Price !== "Free" ? <span className="sign">$</span> : ""}
            {e.Price} <span>/mon</span>
          </div>
          <div
            className="items p-5"
            dangerouslySetInnerHTML={{ __html: e.Features }}
          />
          <div className="action p-5">
            <a className="btn btn-primary" href={e.Link}>
              {e.Button}
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div className="plans-layout">
          {this.state.hero ? (
            <HeroPlans hero={this.state.hero[0]} />
          ) : (
            <Loading title="Cargando..." />
          )}
        </div>
        <div className="plans-list">
          {this.state.plans ? (
            <div className="my-5">
              <div className="container">
                <div className="d-lg-flex">{this.planItem()} </div>
              </div>
            </div>
          ) : (
            <Loading title="Cargando..." />
          )}
        </div>
      </Fragment>
    );
  }
}
