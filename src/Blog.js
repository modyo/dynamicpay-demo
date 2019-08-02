import React from "react";
import { Route, Link } from "react-router-dom";
import { Client, Conditions } from "./sdk";

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogEntries: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    // https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries
    // CORS problems
    const client = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "personas"
    });
    client
      .getEntries("posts")
      .then(response => response)
      .then(data => {
        let items = [];
        console.log("DDD data: ", data);
        for (let index = 0; index < data.entries.length; index++) {
          const itemData = data.entries[index].fields;
          const itemUUID = data.entries[index].meta;
          const item = { ...itemData, ...itemUUID };
          items.push(item);
        }
        const sortedItems = items.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );
        console.log("BLOG sortedItems: ", sortedItems);
        this.setState({ blogEntries: sortedItems, isLoading: false });
      });
  }
  render() {
    console.log("BLOG this.state.blogEntries: ", this.state.blogEntries);
    console.log("BLOG this.props: ", this.props);
    const { blogEntries, isLoading } = this.state;
    return (
      <div className="blog">
        <div className="container">
        <h2 className="mb-5">Blog</h2>
        <div className="posts row">
          {blogEntries.map((item, i) => (
            <div className="col-md-4" key={item.uuid}>
            <div className="card mb-4">
              <img src={item.covers[0].url} alt="" />
              <div className="card-body">
                <h3 className="h5"><Link to={`/blog/${item.uuid}`}>
                  {item.title}
                </Link></h3>
                <p>{item.excerpt}</p>
                <a href={`/blog/${item.uuid}`} className="btn btn-link">+  Leer más</a>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
}

export default Blog;
