const service = require("./WishListService");

const WishListBasic = (props) => {
  const deleteElement = (data) => {
    return service
      .delete(data.uuid)
      .then((response) => {
        props.checkResponse(response.status);
        props.dispatch({
          type: "DELETE",
          value: props.data,
        });
      })
      .catch((err) => {
        alert(`An error occured during treatment : ${err}`);
      });
  };
  return (
    <tr>
      <td>
        <input
          className="input-checkbox"
          type="checkbox"
          checked={props.isElementClickedGetOne}
          onChange={() =>
            props.getOne(props.data).then((response) => {
              props.dispatch({ type: "GETONE", value: response });
            })
          }
        ></input>
      </td>
      <td> {props.data.name}</td>
      <td> {props.data.store}</td>
      <td> {props.data.price}</td>
      <td>
        <button
          className="btn-edit"
          type="button"
          onClick={() => props.prepareFormModification(props.data)}
        >
          <img src="https://img.icons8.com/ios-glyphs/30/null/pencil--v1.png" />
        </button>
      </td>
      <td>
        <button
          className="btn-delete"
          type="button"
          onClick={() => deleteElement(props.data)}
        >
          <img src="https://img.icons8.com/ios-glyphs/30/null/delete.png" />
        </button>
      </td>
    </tr>
  );
};

export default WishListBasic;
