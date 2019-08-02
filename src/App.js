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
          <header className="fixed-top scroll-change" data-menu-anima="fade-bottom">
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
              <a className="navbar-brand" href="#">
                <img src={logo} />
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
          <Route exact path="/" component={Home} />
          <Route path="/plans" component={Plans} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:postId" component={PostShow} />
        </header>
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
