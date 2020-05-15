import React from "react";
import getEntry from "./modyoDynamicEntry";
import { withNamespaces } from "react-i18next";
import i18n from "./i18n";

class PostShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: "undefined",
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getPost();
    this.checkLanguageChanged();
  }

  getPost() {
    this.setState({ isLoadingHero: true, isLoading: true });
    const id = this.props.match.params.postId;
    getEntry("getdynamicpay-content", "blog", i18n.language, id).then(
      (data) => {
        // console.log("data: ", data);
        const itemData = data.fields;
        const itemUUID = data.meta;
        const item = { ...itemData, ...itemUUID };
        this.setState({ entry: item, isLoading: false });
      }
    );
  }

  checkLanguageChanged() {
    i18n.on("languageChanged", (lng) => {
      this.setState({ isLoading: true });
      this.getPost();
    });
  }

  render() {
    // console.log("AAA Post: ", this.props);
    // console.log("render isLoading", this.state.isLoading);
    const { entry } = this.state;
    const { t } = this.props;
    // console.log("entry: ", entry.covers ? entry.covers[0].url : null);
    return (
      <div className='post-show mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-2' />
            <div className='col-md-8'>
              {this.state.loading === true ? (
                <div className='loading'>
                  <div class='spinner-border text-secondary' role='status'>
                    <span class='sr-only'>{t("global-loading")}</span>
                  </div>{" "}
                  <span className='ml-4'>{t("global-loading")}</span>
                </div>
              ) : (
                <div>
                  {entry.cover ? (
                    <div className='main-cover'>
                      <img src={entry.cover.url} alt='Cover' />
                      <h1>{entry.title}</h1>
                    </div>
                  ) : null}
                  <div
                    className='mb-5'
                    dangerouslySetInnerHTML={{ __html: entry.description }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(PostShow);
