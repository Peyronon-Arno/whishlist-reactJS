import "./WishStyle.css";
import { useState, useEffect, useReducer } from "react";
import WishAdd from "./WishAdd";
import WishListHeader from "./WishListHeader";
import WishOne from "./WishOne";
import WishModify from "./WishModify";
import WishListBasic from "./WishListBasic";
const service = require("./WishListService");

const reducer = (state, action) => {
  switch (action.type) {
    case "ASC":
      return [
        ...state.sort((a, b) => {
          return a.price - b.price;
        }),
      ];
    case "DESC":
      return [
        ...state.sort((a, b) => {
          return b.price - a.price;
        }),
      ];
    case "GETALL":
      return action.value;
    case "PUT":
      for (let i = 0; i < state.length; i++) {
        if (state[i].uuid === action.value.uuid) {
          state[i] = action.value;
        }
      }
      return state;
    case "DELETE":
      return state.filter((wish) => wish.uuid !== action.value.uuid);
    case "GETONE":
      return [action.value];
    case "POST":
      state.push(action.value);
      return state;
    default:
      throw new Error(`Verb not recognized ${action.type}`);
  }
};

const WishList = () => {
  const [dataModified, setDataModified] = useState(undefined);
  const [isElementClickedGetOne, setIsElementClickedGetOne] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);

  const prepareFormModification = async (d) => {
    setDataModified(d);
  };

  const cancel = () => {
    setDataModified(undefined);
  };

  const addElement = () => {
    setIsAdding(true);
  };

  const hideNewRow = () => {
    setIsAdding(false);
  };

  const checkResponse = (status, verb) => {
    if (status === 401) {
      localStorage.removeItem("jwt");
      document.location.href = "/";
    }
    if (status === 422) {
      alert(`An error occured while ${verb}`);
    }
  };

  const getOne = (d) => {
    if (isElementClickedGetOne === true) {
      setIsElementClickedGetOne(false);
      return getAll();
    } else {
      setIsElementClickedGetOne(true);
      return service
        .getOne(d.uuid)
        .then((response) => {
          checkResponse(response.status);
          return response.json();
        })
        .then((body) => {
          return new Promise((resolve, reject) => {
            resolve(body);
          });
        })
        .catch((err) => {
          alert(`An error occured during treatment : ${err}`);
        });
    }
  };

  const getAll = () => {
    return service
      .getAll()
      .then((response) => {
        checkResponse(response.status);
        return response.json();
      })
      .then((body) => {
        setDataModified({});
        return new Promise((resolve, reject) => {
          resolve(body);
        });
      })
      .catch((err) => {
        alert(`An error occured during treatment : ${err}`);
      });
  };

  useEffect(() => {
    getAll().then((whishlist) => {
      dispatch({ type: "GETALL", value: whishlist });
    });
  }, []);

  return (
    <table className="table">
      <thead>
        <WishListHeader
          isElementClickedGetOne={isElementClickedGetOne}
          getAll={getAll}
          addElement={addElement}
          dispatch={dispatch}
        />
      </thead>
      <tbody>
        {state.map((data, index) => {
          if (isElementClickedGetOne === true) {
            return (
              <WishOne
                key={index}
                data={data}
                isElementClickedGetOne={isElementClickedGetOne}
                getOne={getOne}
                dispatch={dispatch}
              />
            );
          }
          if (dataModified !== undefined && dataModified.uuid === data.uuid) {
            return (
              <WishModify
                key={index}
                isElementClickedGetOne={isElementClickedGetOne}
                getOne={getOne}
                dispatch={dispatch}
                dataModified={dataModified}
                data={data}
                cancel={cancel}
                checkResponse={checkResponse}
              />
            );
          } else {
            return (
              <WishListBasic
                key={index}
                isElementClickedGetOne={isElementClickedGetOne}
                getOne={getOne}
                dispatch={dispatch}
                data={data}
                prepareFormModification={prepareFormModification}
                checkResponse={checkResponse}
              />
            );
          }
        })}
        <WishAdd
          checkResponse={checkResponse}
          dispatch={dispatch}
          hideNewRow={hideNewRow}
          isAdding={isAdding}
        />
      </tbody>
    </table>
  );
};
export default WishList;
