const ENDPOINT = 'https://restcountries.com/v3.1/name/';

const fields = {
  name: 'name',
  capital: 'capital',
  population: 'population',
  flags: 'flags',
  languages: 'languages',
};

function fetchData(country) {
  return fetch(`${ENDPOINT}${country}?fields=${Object.keys(fields)}`).then(
    response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    }
  );
}

export default fetchData;
