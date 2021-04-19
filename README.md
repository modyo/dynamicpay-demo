# DynamicPay Demo Site

This is a demo site.

## Instalation

Use package manager [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/) to install dependencies and start the development server

```bash
# for npm users
npm install && npm start
# for yarn users
yarn && yarn start
```

## Usage

This project was created with Create-React-App (CRA), by default CRA uses [Workbox](https://developers.google.com/web/tools/workbox) to create the service worker, and use features as Strategies, Precaching, Runtime caching, and so on. You can find it in `src/swWorkbox.js`.

Currently, the project is using a **custom Service Worker**, built with Vanilla JS, which you can modify to implement your own cache strategies. You can find it in `public/swCustom.js`.

Service workers can run only over **HTTPS** connection, to see more you can visit [this link](https://developers.google.com/web/fundamentals/primers/service-workers).

To use Workbox or custom service worker, just replace the file name in `src/swRegister.js`

### `swRegister.js`

```js
window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/swCustom.js`;
```

## Custom Service Worker

To test *offline* feature of your **custom service worker**, you'll need some previous steps:

1. Download and install [ngrok](https://ngrok.com/download)
2. Serve the project
      ```bash
      # for npm users
      npm start
      # for yarn users
      yarn start
      ```
3. Once your local server is up, *e.g. http://localhost:3000* you can deploy it over a HTTPS connection with ngrok
      ```bash
      {path-of-ngrok-executable}/ngrok http 3000
      ```
4. Finally, you can test your page offline and see what resources are being cached with browser DevTools