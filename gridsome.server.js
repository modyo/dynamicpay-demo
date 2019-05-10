// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get(
      "http://dynamicbank.modyo.build/api/content/spaces/fintech/types/post/entries"
    );

    const contentType = store.addContentType({
      typeName: "BlogPosts"
      // route: "blog/:slug" // add this for one dynamic route...
    });

    for (const item of data.entries) {
      const { meta, fields } = item;
      const id = meta.uuid;
      const title = fields.Titulo;
      const desc = fields.Descripcion;
      const createdAt = meta.created_at;
      contentType.addNode({
        id,
        title,
        content: desc,
        path: `blog/${id}`, //... or this for a route per item
        fields: {
          createdAt
        }
      });
    }
  });
};
