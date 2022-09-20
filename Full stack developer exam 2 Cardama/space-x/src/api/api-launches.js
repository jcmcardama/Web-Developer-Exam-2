export const retrieveLaunches = () => {
    return fetch('https://api.spacexdata.com/v4/launches/')
      .then(response => response.json())
      .catch(error => console.log('error', error));
};