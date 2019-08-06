import React from "react";
import img1 from "./images/mk-9.png";
import img2 from "./images/mk-10.png";

export default function HeroInvite(props){

  return (
    <div className="section-empty">
        <div className="content text-center">
            <div className="row">
                <div className="col-md-3 d-none d-lg-block">
                    <img className="abs-image margin-negative-50" src={img1} alt="" />
                </div>
                <div className="col-md-6 col-sm-12" >
                    <hr className="space" />
                    <h1 className="text-color">
                        {props.hero.title}
                    </h1>
                    <hr className="space s" />
                    
                    <p className="width-80" dangerouslySetInnerHTML={{ __html: props.hero.description }} />
                    
                    <hr className="space m" />
                    <a href={props.hero.url} className="btn btn-lg btn-border">{props.hero.button}</a>
                    <hr className="space l" />
                </div>
                <div className="col-md-3 d-none d-lg-block">
                    <img className="abs-image pull-right margin-negative-50" src={img2} alt="" />
                </div>
            </div>
        </div>
    </div>
  );
};
