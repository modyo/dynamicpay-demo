// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get(
      "http://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/post/entries"
    );

    const contentType = store.addContentType({
      typeName: "Posts"
    });

    for (const item of data.entries) {
      const { meta, fields } = item;
      const spaceId = meta.space;
      const typeName = meta.type_name;
      const id = meta.uuid;
      const title = fields.Titulo;
      const desc = fields.Descripcion;
      contentType.addNode({
        id,
        title,
        content: desc,
        fields: { spaceId, typeName }
      });
    }
    console.log("===================================");
    // console.log("contentType: ", contentType);
    console.log("===================================");
  });
};
