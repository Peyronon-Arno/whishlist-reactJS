import WishListHeaderData from "./WishListHeaderData";
import { useState } from "react";
const WishListHeader = (props) => {
  const [order, setOrder] = useState("");

  const changeOrderPrice = () => {
    if (!props.isElementClickedGetOne) {
      if (order === "ASC") {
        setOrder("DESC");
        props.dispatch({ type: "DESC" });
      } else if (order === "DESC") {
        setOrder("");
        props.getAll().then((response) => {
          props.dispatch({ type: "GETALL", value: response });
        });
      } else {
        setOrder("ASC");
        props.dispatch({ type: "ASC" });
      }
    }
  };

  return (
    <tr>
      {WishListHeaderData.map((d, index) => {
        if (d.name === "+") {
          return (
            <td key={index}>
              <button className="btn-add" onClick={() => props.addElement()}>
                {d.name}
              </button>
            </td>
          );
        }
        if (d.name === "Price") {
          return (
            <td
              key={index}
              className="price-header"
              onClick={() => changeOrderPrice()}
            >
              {d.name} {order}
            </td>
          );
        }
        return <td key={index}>{d.name}</td>;
      })}
    </tr>
  );
};

export default WishListHeader;
