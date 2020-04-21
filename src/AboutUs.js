import React, { Component, Fragment } from "react";
import getEntries from "./modyoBankyoEntries";
import Loading from "./Loading";
import "./Plans.css";
import img1 from "./img-stock/bg-23.jpg";
import { withNamespaces } from 'react-i18next';
import i18n from "./i18n";

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null
    };
  }

  componentDidMount() {
    this.getCard();
    this.checkLanguageChanged();
  }

  getCard() {
    getEntries("getdynamicpay-content", "card", i18n.language, "meta.tag=hero-about")
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index].fields;
          items.push(item);
        }

        this.setState({ hero: items, isLoading: false });
      });
  }

  checkLanguageChanged() {
    i18n.on('languageChanged', (lng) => {
      this.setState({ hero: null });
      this.getCard();
    });
  }

  layoutHero() {
    const hero = this.state.hero[0];
    const { t } = this.props;

    return (
      <Fragment>
        <div className="header-video white">
          <div className="videobox">
            <video autoPlay loop muted>
              <source src={hero.cover.url} type="video/mp4" />
            </video>
          </div>
          <div className="overlaybox pt-5">
            <div className="container">
              <div className="title-base">
                <hr className="anima" />
                <h1>{hero.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: hero.description }} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="section-bg-image"
          style={{ backgroundImage: `url(${img1})` }}
        >
          <div className="container content">
            <div className="row">
              <div className="col-md-6 col-center text-center boxed-inverse shadow-1">
                <h4>{t('about-us-our-services')}</h4>
                <p>{t('about-us-description')}</p>
                <a href="/#servicios" className="btn btn-primary btn-lg">{t('about-us-services')}</a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  render() {
    const { t } = this.props;
    const loading = t('global-loading');
    return (
      <Fragment>
        {this.state.hero ? this.layoutHero() : <Loading title={loading} />}
      </Fragment>
    );
  }
}


export default withNamespaces()(AboutUs);
