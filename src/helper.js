const axios = require('axios');

export function search(term) {
  var d = getResults(term);
  console.log(d);
}

async function getResults(term) {
  try {
    var searchedfor = await axios(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${term}&format=json`);
    console.log('getResults: ' + JSON.stringify(searchedfor));
    return searchedfor;
  } catch (error) {
    console.log(error);
  }
}
