import React, { Component, Fragment } from "react";
import HeroPlans from "./HeroPlans";
import getEntries from "./modyoDynamicEntries";
import Loading from "./Loading";
import "./Plans.css";
import { withNamespaces } from "react-i18next";
import i18n from "./i18n";

class Plans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      plans: null,
    };
  }

  componentDidMount() {
    this.getHero();
    this.getPlans();
    this.checkLanguageChanged();
  }

  getHero() {
    getEntries(
      "getdynamicpay-content",
      "hero",
      i18n.language,
      "meta.tags=hero-plans"
    ).then((data) => {
      let items = [];
      for (let index = 0; index < data.entries.length; index++) {
        const item = data.entries[index].fields;
        items.push(item);
      }
      this.setState({ hero: items, isLoading: false });
    });
  }

  getPlans() {
    getEntries("getdynamicpay-content", "plans", i18n.language).then((data) => {
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

  checkLanguageChanged() {
    i18n.on("languageChanged", (lng) => {
      this.setState({ isLoading: true, hero: null, plans: null });
      this.getHero();
      this.getPlans();
    });
  }

  planItem() {
    return this.state.plans.map((e, i) => {
      return (
        <div className='plan-item bg-white flex-1 mx-lg-4 mb-4 mb-lg-0' key={i}>
          <div className='pricing-name'>
            <h4 className='text-normal mb-0'>{e.title}</h4>
          </div>
          <div className='pricing-price'>
            {e.price !== "Free" ? <span className='sign'>$</span> : ""}
            {e.price} <span>/mon</span>
          </div>
          <div
            className='items p-5'
            dangerouslySetInnerHTML={{ __html: e.features }}
          />
          <div className='action p-5'>
            <a className='btn btn-primary' href={e.link}>
              {e.button}
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    const { t } = this.props;
    const loading = t("global-loading");
    return (
      <Fragment>
        <div className='plans-layout'>
          {this.state.hero ? (
            <HeroPlans hero={this.state.hero[0]} />
          ) : (
            <Loading title={loading} />
          )}
        </div>
        <div className='plans-list'>
          {this.state.plans ? (
            <div className='my-5'>
              <div className='container'>
                <div className='d-lg-flex'>{this.planItem()} </div>
              </div>
            </div>
          ) : (
            <Loading title={loading} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default withNamespaces()(Plans);
