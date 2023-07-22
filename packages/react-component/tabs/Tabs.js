import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import WishList from "../wishlist/WishList";
import "./TabsStyle.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "JWT": {
      if (action.value === null) {
        document.location.href = "/";
      }
      if (
        JSON.parse(atob(action.value.split(".")[1])).exp < Date.now() / 1000 ||
        action.forceDisconnect
      ) {
        localStorage.removeItem("jwt");
        document.location.href = "/";
      }
    }
  }
};

const Tabs = () => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "JWT", value: localStorage.getItem("jwt") });
  });

  return (
    <div className="containerTest">
      <div className="bloc-tabs">
        <button className="tabs active-tabs">Wishlist</button>
      </div>
      <div className="content">
        <WishList key={1} />
      </div>
      <button
        className="disconnect-btn"
        onClick={() =>
          dispatch({
            type: "JWT",
            value: localStorage.getItem("jwt"),
            forceDisconnect: true,
          })
        }
      >
        Sign out
      </button>
      <Link className="link" to={`/${SUBJECT}/informations`}>
        See more
      </Link>
    </div>
  );
};

export default Tabs;
