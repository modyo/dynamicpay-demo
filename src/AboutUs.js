import React, {Component, Fragment} from 'react'
import { Client, Conditions } from "./sdk";
import Loading from "./Loading"
import './Plans.css';
import img1 from './img-stock/bg-23.jpg';

export default class AboutUs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hero: null
    }
  }

  componentDidMount() {
    const plans = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "fintech"
    });
    plans
      .getEntries("card", "meta.tag=hero-about")
      .then(response => response)
      .then(data => {
        let items = [];
        for (let index = 0; index < data.entries.length; index++) {
          const item = data.entries[index].fields;
          items.push(item);
        }

        this.setState({ hero: items, isLoading: false });
      });
  }

  layoutHero() {
    const hero = this.state.hero[0];
    return (
    <Fragment>
    <div className="header-video white">
      <div className="videobox">
          <video autoPlay loop muted>
              <source src={hero.cover.url} type="video/mp4" />
          </video>
      </div>
    <div className="overlaybox pt-5">
        <div className="container">
            <div className="title-base">
                <hr className="anima" />
                <h1>{hero.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: hero.description }} />
            </div>
        </div>
    </div>
  </div>
  <div class="section-bg-image" style={{backgroundImage: `url(${img1})`}}>
    <div class="container content">
      <div class="row">
        <div class="col-md-6 col-center text-center boxed-inverse shadow-1">
          <h4>Revisa nuestros servicios</h4>
          <p>Lorem ipsum dolor sit amet consectetur adip ullamco laboris nisi utla pariature tempore marto.</p>
          <a href="#" class="btn btn-primary btn-lg">Servicios</a>
        </div>
      </div>
    </div>
  </div>
  </Fragment>
  )
  }
  render() {
    
    return (
        <Fragment>
        {this.state.hero ? this.layoutHero() : <Loading title="Cargando..." />}
      </Fragment>
    )
  }
}