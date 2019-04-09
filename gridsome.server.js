// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    const posts = await axios.get(
      "http://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/post/entries"
    );

    const postsType = store.addContentType({
      typeName: "Posts"
    });
    const menuType = store.addContentType({
      typeName: "Menu"
    });

    for (const item of posts.data.entries) {
      const { meta, fields } = item;
      const spaceId = meta.space;
      const typeName = meta.type_name;
      const id = meta.uuid;
      const title = fields.Titulo;
      const desc = fields.Descripcion;
      postsType.addNode({
        id,
        title,
        content: desc,
        fields: { spaceId, typeName }
      });
    }

    const menu = await axios.get(
      "http://dynamicbank.modyo.build/api/content/spaces/static-data/content_types/menu/entries"
    );
    // console.log("===================================");
    // console.log("menu.data: ", menu.data);
    // console.log("===================================");
    for (const item of menu.data.entries) {
      const title = item.fields.Titulo;
      const id = item.meta.uuid;
      const slug = item.fields.slug;
      menuType.addNode({
        title,
        id,
        fields: {
          slug
        }
      });
    }
  });
};
