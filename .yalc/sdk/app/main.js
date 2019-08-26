import { Client, Conditions } from "../src";

const client = new Client("https://un.modyo.build/api", {
  spaceUID: "testing"
});
console.log(client.spaceURL());
client.getEntries("posts").then(response => console.log(response));
