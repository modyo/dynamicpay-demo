import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Client, Conditions } from "./sdk";
import logo from './images/logo.png'
import Home from "./Home";
import Blog from "./Blog";
import PostShow from "./PostShow";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      isLoading: false
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
        console.log("sortedItems: ", sortedItems);
        this.setState({ entries: sortedItems, isLoading: false });
      });
  }

  render() {
    const { entries, isLoading } = this.state;
    console.log("entries: ", entries);
    console.log("isLoading: ", isLoading);
    const menu = entries;
    return (
      // dynamic component
      <Router>
          {/* Acá está bien, se parsea lo que venga */}
          
          <header data-menu-anima="fade-bottom">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light d-flex">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="" />
              </a>

              <div className="ml-auto" id="navbarNav">
                <ul className="navbar-nav">
                  {menu.map((item, i) => (
                    <li className="nav-item" key={i}>
                      <Link className="nav-link" to={`${item.url}`}>{item.name}</Link>
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
          <Route path="/plans" component={Plans} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:postId" component={PostShow} />


          <footer className="footer-base">
          <div className="content">
              <div className="container">
                  <div className="row">
                      <div className="col-md-3 footer-center text-left">
                          <img width="120" src={logo} alt="" />
                      </div>
                      <div className="col-md-6 footer-left text-left">
                          <p>Collins Street West 8007, San Fransico, United States.</p>
                          <div className="tag-row">
                              <span>support@company.com</span>
                              <span>+02 3205550678</span>
                          </div>
                      </div>
                      <div className="col-md-3 footer-left text-right text-left-sm">
                          <div className="btn-group social-group btn-group-icons">
                              <a target="_blank" href="#" data-social="share-facebook">
                                  <i className="mdi mdi-facebook" />
                              </a>
                              <a target="_blank" href="#" data-social="share-twitter">
                                  <i className="mdi mdi-twitter" />
                              </a>
                              <a target="_blank" href="#" data-social="share-google">
                                  <i className="mdi mdi-google" />
                              </a>
                              <a target="_blank" href="#" data-social="share-linkedin">
                                  <i className="mdi mdi-linkedin" />
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row copy-row">
                  <div className="col-md-12 copy-text">
                      © 2018 Signflow - Multipurpose &amp; Tech Business Template <span>Handmade by <a href="http://schiocco.io/">schiocco.io</a></span>
                  </div>
              </div>
          </div>
      </footer>






      </Router>
    );
  }
}

function Plans() {
  return (
    <div>
      <h2>Plans</h2>
    </div>
  );
}

export default App;
