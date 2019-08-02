import React from "react";
import { Client, Conditions } from "./sdk";

class PostShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: "undefined",
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    // https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries
    // CORS problems
    const id = this.props.match.params.postId;
    const data = fetch(
      `https://dynamicbank.modyo.build/api/content/spaces/personas/types/posts/entries?meta.uuid=${id}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, cors, *same-origin
        // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        return data;
      });
    data.then(d => {
      console.log("d: ", d.entries[0]);
      const itemData = d.entries[0].fields;
      const itemUUID = d.entries[0].meta;
      const item = { ...itemData, ...itemUUID };
      this.setState({ entry: item, isLoading: false });
    });
  }
  render() {
    // console.log("AAA Post: ", this.props);
    const { entry } = this.state;
    // console.log("entry: ", entry.covers ? entry.covers[0].url : null);
    return (
      <div className="post-show mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">

{entry ? (
  <>
    <div className="main-cover">
      <img src={entry.covers ? entry.covers[0].url : null} alt="Cover" />
      <h1>{entry.title}</h1>
    </div>
    <div className="mb-5" dangerouslySetInnerHTML={{ __html: entry.description }} />
    
  </>
) : (
  "Cargando"
)}


            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostShow;
