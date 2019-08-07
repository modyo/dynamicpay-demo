import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Client, Conditions } from "./sdk";
import logo from "./images/logo.png";
import Home from "./Home";
import Blog from "./Blog";
import PostShow from "./PostShow";
import Invite from "./Invite"
import Plans from "./Plans"
import AboutUs from "./AboutUs"


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      activeMenu: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    // https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries
    // CORS problems
    const client = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "static-data"
    });
    client
      .getEntries("menu-item")
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
        this.setState({ entries: sortedItems, isLoading: false });
      });
  }

  render() {
    const { entries, activeMenu } = this.state;
    // console.log("entries: ", entries);
    // console.log("isLoading: ", isLoading);
    const menu = entries;
    return (
      // dynamic component
      <Router>
        {/* Acá está bien, se parsea lo que venga */}

        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light d-flex">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="" />
              </a>
              <button
                onClick={() => this.setState({activeMenu: true})}
                className="btn btn-menu d-lg-none">
                  <i className="mdi mdi-menu mr-0" />
              </button>

              <div className={`ml-auto ${activeMenu ? 'active' : ''}`} id="navbarNav">
              <button
                onClick={() => this.setState({activeMenu: false})}
                className="btn btn-close-menu d-lg-none">
                  <i className="mdi mdi-close mr-0" />
              </button>
                <ul className="navbar-nav">
                  {menu.map((item, i) => (
                    <li className="nav-item" key={i}>
                      <NavLink onClick={() => this.setState({activeMenu: false})} className="nav-link" activeClassName={item.url === "/" ? '' : 'active'} to={item.url}>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
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
        <Route exact path="/invita" component={Invite} />
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/nosotros" component={AboutUs} />
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
              <div className="col-md-12 copy-text">
                  © 2019 Dynamic Pay
              </div>
            </div>
          </div>
        </footer>
      </Router>
    );
  }
}


export default App;
