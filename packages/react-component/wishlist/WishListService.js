export const getAll = () => {
  return fetch("/api/wishlist", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};

export const getOne = (uuid) => {
  return fetch(`/api/wishlist/${uuid}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};

export const post = (stateNameAdd, stateStoreAdd, statePriceAdd) => {
  return fetch(`/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      name: stateNameAdd,
      store: stateStoreAdd,
      price: Number(statePriceAdd),
    }),
  });
};

export const put = (uuid, stateName, stateStore, statePrice) => {
  return fetch(`/api/wishlist/${uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      name: stateName,
      store: stateStore,
      price: Number(statePrice),
    }),
  });
};

const _delete = (uuid) => {
  return fetch(`/api/wishlist/${uuid}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};
export { _delete as delete };
