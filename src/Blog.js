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
      <div>
        <h2>Blog</h2>
        <ul>
          {blogEntries.map((item, i) => (
            <li key={i}>
              <Link to={`/blog/${item.uuid}`}>
                {item.title} - {item.uuid}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Blog;
