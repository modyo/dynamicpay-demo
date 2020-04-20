import { Client } from "@modyo/sdk";

export default function getClient(locale) {
  return new Client("https://bankyo.modyo.cloud", locale);
}
