import React, { Component } from "react";
import HeroInvite from "./HeroInvite";
import getEntries from "./modyoDynamicEntries";
import Loading from "./Loading";
import { withNamespaces } from "react-i18next";
import i18n from "./i18n";

class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
    };
  }

  componentDidMount() {
    this.getCard();
    this.checkLanguageChanged();
  }

  getCard() {
    getEntries(
      "getdynamicpay-content",
      "card",
      i18n.language,
      "meta.tags=hero-invite"
    ).then((data) => {
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

  checkLanguageChanged() {
    i18n.on("languageChanged", (lng) => {
      this.setState({ hero: null, isLoading: true });
      this.getCard();
    });
  }

  render() {
    const { t } = this.props;
    const loading = t("global-loading");
    return (
      <div className='invite-layout'>
        {this.state.hero ? (
          <HeroInvite hero={this.state.hero[0]} />
        ) : (
          <Loading title={loading} />
        )}
      </div>
    );
  }
}

export default withNamespaces()(Invite);
