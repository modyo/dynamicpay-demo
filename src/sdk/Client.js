class Client {
  constructor(apiUrl, options = {}) {
    this.apiUrl = apiUrl;
    this.spaceUID = options.spaceUID;
    this.contentToken = options.contentToken;
  }

  spaceURL() {
    return `${this.apiUrl}/content/spaces/${this.spaceUID}`;
  }
  entriesURL(typeUID) {
    return `${this.spaceURL()}/types/${typeUID}/entries`;
  }

  getEntries(typeUID, query) {
    return this.getData(this.entriesURL(typeUID));
  }

  async getData(url = "") {
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
      .then(data => {
        return data;
      }); // parses JSON response into native JavaScript objects
  }
}

class Conditions {
  static equals(field, value) {
    return `${field}=${value}`;
  }
}

export default Client;
