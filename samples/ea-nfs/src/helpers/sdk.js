function apiRequest(url) {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`)
    .then((response) => response.json())
}

export default {
  getRaces: (callback) => {
    return apiRequest('races')
      .then((races) => callback(null, races))
      .catch(callback);
  }
}
