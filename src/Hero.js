import React from "react";

function Hero(props) {
  console.log("props: ", props);
  const { hero, isLoadingHero } = props;
  return (
    <div>
      {hero
        ? `Title: ${hero.Title}, cover url: ${hero.Cover.url}, Link Title: ${
            hero["Link Title"]
          }, Url link : ${hero["Url Link"]}, Description : ${hero.Description}`
        : ""}
    </div>
  );
}

export default Hero;
