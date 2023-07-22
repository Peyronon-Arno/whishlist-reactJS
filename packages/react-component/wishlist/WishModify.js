import { useReducer } from "react";
const service = require("./WishListService");
const formReducerModify = (state, action) => {
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

const WishModify = (props) => {
  const [stateModify, dispatchModify] = useReducer(formReducerModify, {
    name: "",
    store: "",
    price: "",
  });

  const modifyElement = (d) => {
    if ((stateModify.name && stateModify.store && stateModify.price) !== "") {
      return service
        .put(d.uuid, stateModify.name, stateModify.store, stateModify.price)
        .then((response) => {
          props.checkResponse(response.status, "modifying");
          return response.json();
        })
        .then((body) => {
          props.dispatch({ type: "PUT", value: body });
          props.cancel();
        })
        .catch((err) => {
          alert(`An error occured during treatment : ${err}`);
        });
    } else {
      alert("Fields must be filled !");
    }
  };

  return (
    <tr>
      <td>
        <input
          disabled={true}
          className="input-checkbox-disabled"
          type="checkbox"
          checked={props.isElementClickedGetOne}
          onChange={() =>
            props.getOne(props.data).then((response) => {
              props.dispatch({ type: "GETONE", value: response });
            })
          }
        ></input>
      </td>
      <td>
        <input
          className="input-modify"
          placeholder={props.dataModified.name}
          value={stateModify.name}
          type="text"
          onChange={() =>
            dispatchModify({ type: "NAME", value: event.target.value })
          }
        ></input>
      </td>
      <td>
        <input
          className="input-modify"
          placeholder={props.dataModified.store}
          value={stateModify.store}
          type="text"
          onChange={() =>
            dispatchModify({ type: "STORE", value: event.target.value })
          }
        ></input>
      </td>
      <td>
        <input
          className="input-modify"
          placeholder={props.dataModified.price}
          value={stateModify.price}
          type="number"
          onChange={() =>
            dispatchModify({ type: "PRICE", value: event.target.value })
          }
        ></input>
      </td>
      <td>
        <button
          className="btn-edit"
          type="button"
          onClick={() => modifyElement(props.data)}
        >
          <img src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/null/external-select-checkmark-symbol-to-choose-true-answer-basic-filled-tal-revivo.png" />
        </button>
      </td>
      <td>
        <button className="btn-delete" onClick={() => props.cancel()}>
          <img src="https://img.icons8.com/ios-filled/50/null/delete-sign--v1.png" />
        </button>
      </td>
    </tr>
  );
};

export default WishModify;
