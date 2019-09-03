import { Client } from "@modyo/sdk";

export default function getClient(spaceUID) {
  const client = new Client("https://dynamicbank.modyo.build/api", {
    spaceUID
  });
  return client;
}
