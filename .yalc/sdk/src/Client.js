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
    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => res, this._errorHandler); // parses JSON response into native JavaScript objects
  }
}

class Conditions {
  static equals(field, value) {
    return `${field}=${value}`;
  }
}

export default Client;
