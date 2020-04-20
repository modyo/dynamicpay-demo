import { Client } from "@modyo/sdk";

export default function getClient(spaceUID) {
  return new Client("https://dynamicbank.modyo.cloud");
}
