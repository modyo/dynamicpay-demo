import { Client } from "@modyo/sdk";

export default function getClient(spaceUID) {
  const client = new Client("https://bankyo.modyo.cloud/api", {
    spaceUID
  });
  return client;
}
