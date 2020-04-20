import React from "react";
import { Link } from "react-router-dom";
import getClient from "./modyoClient";
import Loading from "./Loading";
import { withNamespaces } from 'react-i18next';

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
    const client = getClient();
    const clientPosts = client.getContentType("personas", "posts");
    clientPosts.getEntries()
      .then(data => {
          let items = [];
          // console.log("BLOG data: ", data);
          for (let index = 0; index < data.entries.length; index++) {
              const itemData = data.entries[index].fields;
              const itemUUID = data.entries[index].meta;
              const item = { ...itemData, ...itemUUID };
              items.push(item);
          }
          const sortedItems = items.sort((a, b) =>
              a.position > b.position ? 1 : b.position > a.position ? -1 : 0
          );
          this.setState({ blogEntries: sortedItems, isLoading: false });
      });
  }
  render() {
    const { blogEntries, isLoading } = this.state;
    const { t } = this.props;
    const loading = t('global-loading');
    return (
      <div className="blog">
        <div className="container">
          <h2 className="mb-5">{t('blog-title')}</h2>
          {isLoading ? (
            <Loading title={loading} />
          ) : (
            <div className="posts row">
              {blogEntries.map((item, i) => (
                <div className="col-md-4 mb-4" key={item.uuid}>
                  <div className="card">
                    <div className="card-header">
                      <img src={item.covers[0].url} alt="" />
                    </div>
                    <div className="card-body">
                      <h3 className="h5">
                        <Link to={`/blog/${item.uuid}`}>{item.title}</Link>
                      </h3>
                      <p>{item.excerpt}</p>
                      <a href={`/blog/${item.uuid}`} className="btn btn-link">
                        {t('blog-read-more')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Blog);
