import { Client, Conditions } from "../src";

const client = new Client("https://un.modyo.cloud/api", {
  spaceUID: "testing"
});
console.log(client.spaceURL());
client.getEntries("posts").then(response => console.log(response));
