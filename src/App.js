import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import getClient from "./modyoClient";
import logo from "./images/logo.png";
import Home from "./Home";
import Blog from "./Blog";
import PostShow from "./PostShow";
import Invite from "./Invite";
import Plans from "./Plans";
import AboutUs from "./AboutUs";
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      activeMenu: false
    };
  }


  getComponentData() {
    console.log('* getComponentData *');
    console.log('*** i18n: ', i18n.language);
    // TODO: Crear un if del lenguaje => i18n.language
    this.setState({ isLoading: true });
    getClient("static-data")
        .getEntries("menu-item")
        .then(response => {
          // console.log("# response: ", response);
          let items = [];
          for (let index = 0; index < response.entries.length; index++) {
            const item = response.entries[index].fields;
            items.push(item);
          }
          const sortedItems = items.sort((a, b) =>
              a.position > b.position ? 1 : b.position > a.position ? -1 : 0
          );
          // console.log("sortedItems: ", sortedItems);
          this.setState({ entries: sortedItems, isLoading: false });
        });
  }

  componentDidMount() {
    this.getComponentData();
  }

  render() {
    const { entries, activeMenu } = this.state;
    const { t } = this.props;
    // console.log("entries: ", entries);
    // console.log("isLoading: ", isLoading);
    const menu = entries;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      this.getComponentData();
    };
    return (
      // dynamic component
      <Router>
        {/* Acá está bien, se parsea lo que venga */}

        <header>
          <h1>holo: {t('home-title')}</h1>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light d-flex">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="" />
              </a>
              <button
                onClick={() => this.setState({ activeMenu: true })}
                className="btn btn-menu d-lg-none"
              >
                <i className="mdi mdi-menu mr-0" />
              </button>

              <div
                className={`ml-auto ${activeMenu ? "active" : ""}`}
                id="navbarNav"
              >
                <button
                  onClick={() => this.setState({ activeMenu: false })}
                  className="btn btn-close-menu d-lg-none"
                >
                  <i className="mdi mdi-close mr-0" />
                </button>
                <ul className="navbar-nav">
                  {menu.map((item, i) => (
                    <li className="nav-item" key={i}>
                      <NavLink
                        onClick={() => this.setState({ activeMenu: false })}
                        className="nav-link"
                        activeClassName={item.url === "/" ? "" : "active"}
                        to={item.url}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Idioma
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <button className="dropdown-item" onClick={() => changeLanguage('en')}>Inglés</button>
                      <button className="dropdown-item" onClick={() => changeLanguage('es')}>Español</button>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/*
          Acá no. Posibles soluciones:
          - https://stackoverflow.com/questions/48854497/dynamic-routing-in-react-js-component-name-from-a-string-cannot-be-assigned-in
          - https://stackoverflow.com/questions/47245999/how-to-achieve-dynamic-routing-in-react-router-4
          I think that is impossible to do EVERITHING dynamically, with the only exception of blog posts
        */}
          {/*menu.map((item, i) => {
          const TagName = React.createElement("About");
          // var MyComponent = Components[type + "Component"];
          console.log("TagName: ", typeof TagName);
          return (
            <Route key={i + 1} exact path={item.path} component={item.label} />
          );
        })*/}
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/invite" component={Invite} />
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/blog/:postId" component={PostShow} />

        <footer className="footer-base">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-md-3 footer-center text-left mb-3 mb-lg-0">
                  <img width="120" src={logo} alt="" />
                </div>
                <div className="col-md-6 footer-left text-left">
                  <p>Collins Street West 8007, San Fransico, United States.</p>
                  <div className="tag-row">
                    <span>support@getdynamicpay.com</span>
                    <span>+02 3205550678</span>
                  </div>
                </div>
                <div className="col-md-3 footer-left text-right text-left-sm">
                  <div className="btn-group social-group btn-group-icons">
                    <a
                      target="_blank"
                      href="/#dummy-link"
                      data-social="share-facebook"
                    >
                      <i className="mdi mdi-facebook" />
                    </a>
                    <a
                      target="_blank"
                      href="/#dummy-link"
                      data-social="share-twitter"
                    >
                      <i className="mdi mdi-twitter" />
                    </a>
                    <a
                      target="_blank"
                      href="/#dummy-link"
                      data-social="share-google"
                    >
                      <i className="mdi mdi-google" />
                    </a>
                    <a
                      target="_blank"
                      href="/#dummy-link"
                      data-social="share-linkedin"
                    >
                      <i className="mdi mdi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row copy-row">
              <div className="col-md-12 copy-text">© 2020 Dynamic Pay</div>
            </div>
          </div>
        </footer>
      </Router>
    );
  }
}

export default withNamespaces()(App);

