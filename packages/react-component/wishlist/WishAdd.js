import "./WishStyle.css";
import { useReducer } from "react";
const service = require("./WishListService");

const formReducerAdd = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.value };
    case "STORE":
      return { ...state, store: action.value };
    case "PRICE":
      return { ...state, price: action.value };
    default:
      return state;
  }
};

const WishAdd = (props) => {
  const [stateAdd, dispatchAdd] = useReducer(formReducerAdd, {
    name: "",
    store: "",
    price: "",
  });

  const resetValues = () => {
    dispatchAdd({ type: "NAME", value: "" });
    dispatchAdd({ type: "STORE", value: "" });
    dispatchAdd({ type: "PRICE", value: "" });
  };
  const addNewRow = () => {
    return service
      .post(stateAdd.name, stateAdd.store, stateAdd.price)
      .then((response) => {
        props.checkResponse(response.status, "adding");
        return response.json();
      })
      .then((body) => {
        props.dispatch({ type: "POST", value: body });
        props.hideNewRow();
        resetValues();
      })
      .catch((err) => {
        alert(`An error occured during treatment : ${err}`);
      });
  };

  return (
    <tr
      className={props.isAdding === true ? "show-add-row" : "dont-show-add-row"}
    >
      <td></td>
      <td>
        <input
          className="input-add"
          placeholder="Enter new name"
          type="text"
          onChange={() =>
            dispatchAdd({ type: "NAME", value: event.target.value })
          }
          value={stateAdd.name}
        ></input>
      </td>
      <td>
        <input
          className="input-add"
          placeholder="Enter new store"
          type="text"
          onChange={() =>
            dispatchAdd({ type: "STORE", value: event.target.value })
          }
          value={stateAdd.store}
        ></input>
      </td>
      <td>
        <input
          className="input-add"
          placeholder="Enter new price"
          type="number"
          onChange={() =>
            dispatchAdd({ type: "PRICE", value: event.target.value })
          }
          value={stateAdd.price}
        ></input>
      </td>
      <td>
        <button className="btn-edit" type="button" onClick={() => addNewRow()}>
          <img src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/null/external-select-checkmark-symbol-to-choose-true-answer-basic-filled-tal-revivo.png" />
        </button>
      </td>
      <td>
        <button
          className="btn-delete"
          type="button"
          onClick={() => props.hideNewRow()}
        >
          <img src="https://img.icons8.com/ios-filled/50/null/delete-sign--v1.png" />
        </button>
      </td>
    </tr>
  );
};

export default WishAdd;
