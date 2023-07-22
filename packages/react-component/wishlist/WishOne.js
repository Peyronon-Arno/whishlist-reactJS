import "./WishStyle.css";

const WishOne = (props) => {
  return (
    <tr>
      <td>
        <input
          className="input-checkbox"
          type="checkbox"
          checked={props.isElementClickedGetOne}
          onChange={() =>
            props.getOne().then((response) => {
              props.dispatch({ type: "GETALL", value: response });
            })
          }
        ></input>
      </td>
      <td> {props.data.name}</td>
      <td> {props.data.store}</td>
      <td> {props.data.price}</td>
      <td>
        <button className="btn-edit-disabled" type="button" disabled>
          <img src="https://img.icons8.com/ios-glyphs/30/null/pencil--v1.png" />
        </button>
      </td>
      <td>
        <button className="btn-delete-disabled" type="button" disabled>
          <img src="https://img.icons8.com/ios-glyphs/30/null/delete.png" />
        </button>
      </td>
    </tr>
  );
};

export default WishOne;
