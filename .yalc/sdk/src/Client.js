import axios from "axios";

class Client {
  constructor(apiUrl, options = {}) {
    this.apiUrl = apiUrl;
    this.spaceUID = options.spaceUID;
    this.contentToken = options.contentToken;
  }

  _errorHandler(error) {
    if (error.data) {
      throw error.data;
    }
    throw error;
  }

  _spaceURL() {
    return `${this.apiUrl}/content/spaces/${this.spaceUID}`;
  }

  _entriesURL(typeUID) {
    return `${this._spaceURL()}/types/${typeUID}/entries`;
  }

  _entryURL(contentTypeUID, entryUUID) {
    return `${this._spaceURL()}/types/${contentTypeUID}/entries/${entryUUID}`;
  }

  getEntries(typeUID, query) {
    return this.getData(this._entriesURL(typeUID));
  }

  getEntry(contentTypeUID, entryUUID) {
    return this.getData(this._entryURL(contentTypeUID, entryUUID));
  }

  getData(url = "") {
    return axios({
      method: "get",
      url,
      headers: { "Content-Type": "application/json" }
    }).then(res => res.data, this._errorHandler);
  }
}

export default Client;
