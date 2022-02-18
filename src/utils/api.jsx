const url = 'https://norma.nomoreparties.space/api/';

export const getData = async () => {
  return fetch(url + 'ingredients')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}


export const getDataOrder = async (ingredients) => {
  return fetch(url + 'orders', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredients,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}