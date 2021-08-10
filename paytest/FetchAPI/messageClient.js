const fetch = require("node-fetch");
const error = require('../error/index');

async function messageForClient () {
  const URL = 'http://o4d9z.mocklab.io/notify';

  const requestOptions = {
    method: 'GET',
  };

  const response = await fetch(URL, requestOptions)
  .then((response) => response.json());

  if(response.message ==! 'Success') throw error.notAuthorized;

  return response.message;
}

module.exports = messageForClient;