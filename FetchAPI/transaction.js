const fetch = require("node-fetch");
const error = require('../error/index');

async function approvedTransaction () {
  const URL = 'https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6';

  const requestOptions = {
    method: 'GET',
  };

  const response = await fetch(URL, requestOptions)
  .then((response) => response.json());

  if(response.message ==! 'Autorizado') throw error.notAuthorized;

  return response.message;
}

module.exports = approvedTransaction;