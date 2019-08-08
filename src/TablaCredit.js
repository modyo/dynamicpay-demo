import React from "react";
import { Link } from "react-router-dom";
import { Client, Conditions } from "./sdk";
import Loading from "./Loading";
import "./TablaCredit.css";

class TablaCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tablaCreditEntries: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    // https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries
    // CORS problems
    const client = new Client("https://dynamicbank.modyo.build/api", {
      spaceUID: "creditos"
    });
    client
      .getEntries("tabla-de-credito-hipotecario")
      .then(response => response)
      .then(data => {
        let items = [];
        console.log("DDD data: ", data);
        for (let index = 0; index < data.entries.length; index++) {
          const itemData = data.entries[index].fields;
          const itemUUID = data.entries[index].meta;
          const item = { ...itemData, ...itemUUID };
          items.push(item);
        }
        const sortedItems = items.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );
        console.log("tablaCredit sortedItems: ", sortedItems);
        this.setState({ tablaCreditEntries: sortedItems, isLoading: false });
      });
  }
  render() {
    // console.log("tablaCredit this.state.tablaCreditEntries: ", this.state.tablaCreditEntries);
    // console.log("tablaCredit this.props: ", this.props);
    const { tablaCreditEntries, isLoading } = this.state;
    return (
      <div className="blog">
        <div className="container">
          <h2 className="mb-5">Tabla crédito hipotecario</h2>
          {isLoading ? (
            <Loading title="Cargando..." />
          ) : (
            <div className="posts row">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th width="20%">Tipo de Vivienda</th>
                    <th className="text-center" width="20%">
                      % de
                      <br />
                      Financiamiento
                    </th>
                    <th className="text-center" width="20%">
                      Plazo
                    </th>
                    <th className="text-center" width="20%">
                      Valor de
                      <br />
                      Vivienda *
                    </th>
                    <th className="text-center" width="20%">
                      CAT
                      <br />
                      PROMEDIO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tablaCreditEntries.map((item, i) => (
                    <tr key={item.uuid}>
                      <td>{item["Tipo de vivienda"]}</td>
                      <td align="middle">
                        {item["Porcentaje de financiamiento"]}
                      </td>
                      <td align="middle">{item["Plazo"]}</td>
                      <td align="middle">{item["Valor de vivienda"]}</td>
                      <td align="middle">{item["CAT promedio"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TablaCredit;
