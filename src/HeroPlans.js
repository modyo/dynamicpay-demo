import React from "react";

const stylesHero = {
  backgroundColor: "#DBDEE7",
  backgroundPosition: "400px 0",
  backgroundRepeat: "no-repeat"
}

export default function HeroInvite(props){
  if(props.length === 0) return <div>Cargando...</div>
  return (
    <div className="header-title mt-0" style={{...stylesHero, backgroundImage: `url(${props.hero.Cover.url})`}}>
      
          <div className="title-base d-flex align-items-center h-100 p-5">
              <div>
                <h1>{props.hero.Title}</h1>
                <p dangerouslySetInnerHTML={{ __html: props.hero.Description }} />
              </div>
          </div>
      
  </div>

  );
};
