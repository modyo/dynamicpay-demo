import { Client } from "@modyo/sdk";

export default function getEntries(spaceUID, typeUID, locale, filters) {
  const apiUrl = "https://dynamic.modyo.cloud";
  const client = new Client(apiUrl, locale);
  const contentType = client.getContentType(spaceUID, typeUID);

  return new Promise((resolve, reject) => {
    contentType.getEntries(filters).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
